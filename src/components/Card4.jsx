import React from 'react'


const Card4 = ({image,title, desc}) => {
  return (
    <div className='flex  gap-6 mx-auto flex-col   py-5'>
        <h1 className='font-bold text-xl'>Stay Updated</h1>
       <div  className="flex-shrink-0 ">
        <div className=''>
        <img src={image} alt='image' className='aspect-video  object-cover w-[556px]  ' />
        </div>
        <div  className="flex flex-col justify-center gap-2 pl-5">
           <p className='text-sm font-semibold'>{title}</p>
            <h1 className=' text-base font-semibold'>{desc}</h1>
           
        </div>
        </div>
        </div>
      
       
  )
}

export default Card4