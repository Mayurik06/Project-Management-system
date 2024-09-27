import React from 'react'

function Card({heading,counter}) {
  return (
    <div className='bg-white rounded-[4px] flex items-center justify-start shadow-custom'>
      <div className='bg-[#0CC9E8] h-full p-1 rounded-tl-[4px] rounded-bl-[4px]'>
      </div>
      <div className='py-[9px] px-[18px]'>
      <p className='text-[15px] text-[#474D52] leading-[20px]'>{heading}</p>
      <p className='text-[40px] font-bold leading-[54px] text-[#474D52]'>{counter}</p>
      </div>
    </div>
  )
}

export default Card
