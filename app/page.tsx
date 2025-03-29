
import React from 'react'

const page = () => {
  return (
    <div className='flex items-center mt-80 ml-160'>
      <form>
        <input 
        type='text'
        placeholder='entrer votre url'
        className='border border-round border-color-success'
        />
        <button> Envoyer </button>
      </form>
    </div>
  )
}

export default page
