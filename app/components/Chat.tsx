import { ArrowUp } from 'lucide-react'
import React from 'react'

const Chat = ({decodedLink}: {decodedLink: string}) => {
  return (
    <div className='flex flex-col items-center p-4 relative h-screen'>
        <div className='mb-4'>
            <div className='badge badge-soft badge-success badge-lg'>
            {decodedLink}
            </div>
        </div>

        {/* <div></div> */}

        <form
          className='absolute bottom-4 left-4 right-4
           md:left-auto md:right-auto md:w-full md:max-w-4xl
          p-4 rounded-3xl border border-base-300 flex items-center
          bg-base-300'>

            <div className='w-full'>
              <textarea 
                className='w-full outline-0 resize-none h-full bg-transparent m-2 mb-4'>

              </textarea>
              <div className='flex justify-between items-center'>
                <div className='badge badge-soft badge-success badge-lg'>
                 Jaabi.ai
                </div>
                <button className='btn btn-circle btn-primary'>
                  <ArrowUp/>
                </button>
              </div>
            </div>
        </form>
      
    </div>
  )
}

export default Chat
