import React from 'react'
import {Message as Tmessage} from 'ai/react'
import Message from './Message'
const MessagesList = ({messages}: {messages: Tmessage[]})=>{
 {
  return (
    <div className='space-y-2'>
        {
            messages.map((message, index) => (
                <Message key={index} content={message.content} isUsermessage={message.role ==="user"}></Message>
            ))
        }
      
    </div>
  )
}
}
export default MessagesList
