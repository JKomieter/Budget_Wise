import React from 'react'
import Image from 'next/image'

function LeftContent() {
  return (
    <div className='h-screen w-full md:block hidden'>
      <Image
        src='/images/left.jpg'
        alt='Picture of the author'
        width={500}
        height={500}
        className='object-cover h-full w-full'
      />
    </div>
  )
}

export default LeftContent