import React from 'react'

interface MessageProps{
    content: string;
    isUsermessage: boolean;
}

const Message = ({content , isUsermessage}: MessageProps) => {
    const filteredContent = content.startsWith("Réponds en français : ")
    ? content.replace("Réponds en français : ", "")
    : content
  return (
    <div className={`flex w-full ${isUsermessage ? 'justify-end': ''}`}>
      <div className={`max-w-4xl p-4 break-words ${isUsermessage ? 'bg-base-300 rounded-3xl': 'w-full'}`}>
        {filteredContent}

      </div>
    </div>
  )
}

export default Message
