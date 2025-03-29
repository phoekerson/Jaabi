import { ragChat } from "@/lib/rag-chat";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    try{
        console.log("Appel de l'api en cours")
        const { messages, sessionId} = await req.json()
        const lastMessage = messages[messages.length - 1].content
        const promptInFrench = `Réponds en français: ${lastMessage}`
        const response = await ragChat.chat(promptInFrench, {streaming: true, sessionId})
        if(!response){
            console.log("Aucune réponse obtneue")
            return new Response("Aucune réponse obtenue", {status: 500})
        }
        console.log(response)
    }catch(error){
        return new Response("Erreur survenue", {status: 500})
    }
}