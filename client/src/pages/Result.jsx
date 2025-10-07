import React from 'react'
import { assets } from '../assets/assets'

const Result = () => {
  return (
    <div className='mx-4 my-3 lg:mx-44 mt-14 min-h-[55vh]'>
      
      <div className='bg-white rounded-lgpx-8 py-6 px-6 drop-shadow-sm'>
       {/* -----Image Container--- */}
       <div className='flex flex-col sm:grid grid-cols-2 gap-8'>
      {/* ---Left Slide---- */}
      <div>
        <p className='text-center font-semibold text-gray-600 mb-2'>Original</p>
        <img src = {assets.image_w_bg} alt='image_w_bg' className='rounded-md border' />
      </div>
      {/* ---Right Slide---- */}
      <div className='flex flex-col'>
        <p className='text-center font-semibold text-gray-600 mb-2'>Background Removed</p>
        <div className='rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden'>
        <img src = {assets.image_wo_bg} alt='image_wo_bg'/>
        <div className='absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2'>
          {/* <div className='border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin'>
          </div> */}
        </div>

        </div>

       </div>

      </div>

      {/* -----Buttons Container--- */}
      <div className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6'>
      <button className='px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700'>Try another image</button>
      <a href='#' className='px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700'>Download image</a>
      </div>
      
      </div>

    </div>
  )
}

export default Result