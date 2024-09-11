import Image from 'next/image'
import React from 'react'

export default function Hero() {
  return (
    <div >
      <div className='relative w-full h-dvh'>
        <Image fill src="/hero.png"/>
        hello
      </div>
    </div>
  )
}
