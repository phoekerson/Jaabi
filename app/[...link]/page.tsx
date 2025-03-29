import React from 'react';
import Chat from '../components/Chat';
import { cookies } from 'next/headers';
import { redis } from '@/lib/redis';
import { ragChat } from '@/lib/rag-chat';

interface PageProps {
  params: {
    link: string[]; // Forcer le type en tableau de chaînes
  };
}

function reconstructUrl(url: string[]) {
  return url.map(decodeURIComponent).join('/');
}

const Page = async ({ params }: PageProps) => {
  if (!params?.link || !Array.isArray(params.link)) {
    return <div>Erreur, veuillez fournir un lien valide</div>;
  }

  const sessionCookies = (await cookies()).get("sessionId")?.value;
  const decodedLink = reconstructUrl(params.link);
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
