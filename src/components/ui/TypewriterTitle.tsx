import React from 'react'
import Typewriter from 'typewriter-effect'

type Props = {}

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter 
      
      options={ {
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter.typeString('Create your own flashcards and play with them')
        .pauseFor(2000)
        .deleteAll()
        .typeString('Create your own flashcards and play with them ')
        .start();
      }}
  
    />

    
  )
}

export default TypewriterTitle

