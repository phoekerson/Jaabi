import React from 'react';
import Chat from '../components/Chat';
import { cookies } from 'next/headers';
import { redis } from '@/lib/redis';
import { ragChat } from '@/lib/rag-chat';
import { PageProps } from 'next'; // Utilisation du type officiel de Next.js

function reconstructUrl(url: string[]) {
  return url.map(decodeURIComponent).join('/');
}

const Page = async ({ params }: PageProps) => {
  if (!params?.link) {
    return <div>Erreur, veuillez fournir un lien valide</div>;
  }

  const sessionCookies = cookies().get("sessionId")?.value;
  const linkArray = Array.isArray(params.link) ? params.link : [params.link];
  const decodedLink = reconstructUrl(linkArray);
  const sessionId = (decodedLink + "__" + sessionCookies).replace(/\//g, "");

  const isAlreadyIndexed = await redis.sismember("indexed-urls", decodedLink);
  if (!isAlreadyIndexed) {
    console.log("Indexation du lien en cours...");
    await ragChat.context.add({
      type: "html",
      source: decodedLink,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });
    await redis.sadd("indexed-urls", decodedLink);
  }

  const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId });

  return (
    <div>
      <Chat decodedLink={decodedLink} sessionId={sessionId} initialMessages={initialMessages} />
    </div>
  );
};

export default Page;
