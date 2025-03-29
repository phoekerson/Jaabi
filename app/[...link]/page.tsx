import React from 'react'
import Chat from '../components/Chat'
interface PageProps{
  params : {
    link?: string | string[];
  }
}
function reconstructUrl({url}: {url: string[]}){
  const decodedComponents = url.map((component)=>decodeURIComponent(component))
  return decodedComponents.join('/');
}
const page = async({params}: PageProps) => {
  const awaitedParams = await params 
  if(!awaitedParams?.link){
    return <div> Erreur, veuillez founrir un lien</div>
  }
  const linkArray = Array.isArray(awaitedParams.link) ? awaitedParams.link: [awaitedParams.link]
  const decodedLink = reconstructUrl({url: linkArray})
  return (
    <div>
      <Chat decodedLink={decodedLink}></Chat>
      
    </div>
  )
}

export default page
