import React from 'react'
import Chat from '../components/Chat'
import { cookies } from 'next/headers';
import { redis } from '@/lib/redis';
import { ragChat } from '@/lib/rag-chat';

interface PageProps{
  params : {
    link?: string | string[];
  }
}
function reconstructUrl({url}: {url: string[]}){
  const decodedComponents = url.map((component)=>decodeURIComponent(component))
  return decodedComponents.join('/');
}
const Page = async({params}: PageProps) => {

  const sessionCookies = (await cookies()).get("sessionId")?.value




  const awaitedParams = params 
  if(!awaitedParams?.link){
    return <div> Erreur, veuillez founrir un lien</div>
  }
  const linkArray = Array.isArray(awaitedParams.link) ? awaitedParams.link: [awaitedParams.link]
  const decodedLink = reconstructUrl({url: linkArray})

  const sessionId = (decodedLink + "__" + sessionCookies).replace(/\//g,"")
  const isAlreadyIndexed = await redis.sismember("indexed-urls", decodedLink)
  if(!isAlreadyIndexed){
    console.log("Indexation du lien en cours")
    await ragChat.context.add({
      type: "html",
      source: decodedLink,
      config: {chunkOverlap:50, chunkSize: 200}
    })
    await redis.sadd("indexed-urls", decodedLink)
  }
  const initialMessages = await ragChat.history.getMessages({amount: 10, sessionId})
  return (
    <div> 
      <Chat 
        decodedLink={decodedLink}
        sessionId={sessionId}
        initialMessages={initialMessages}></Chat>
      
    </div>
  )
}

export default Page
