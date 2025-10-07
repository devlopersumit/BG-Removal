import React from 'react'
import { assets } from '../assets/assets'

const Steps = () => {
  return (
    <div className='mx-4 lg:mx-44 py-20 xl:py-40'>
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>
        Steps to remove background <br/> image in seconds 
        </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 xl:mt-24'>
        
        {/* Step 1 */}
        <div className='relative flex flex-col items-start gap-4 bg-white border drop-shadow-md p-7 rounded-lg hover:shadow-xl transition-all duration-300'>
            <div className='absolute top-4 right-4 bg-gray-100 text-gray-600 font-bold text-lg rounded-full h-10 w-10 flex items-center justify-center'>1</div>
            <img className='max-w-10' src={assets.upload_icon} alt="Upload Icon"/>
            <div>
                <p className='text-xl font-medium'>Upload Image</p>
                <p className='text-sm text-neutral-500 mt-1'>Simply drag and drop your image or click to select a file from your device.</p>
            </div>
        </div>

        {/* Step 2 */}
        <div className='relative flex flex-col items-start gap-4 bg-white border drop-shadow-md p-7 rounded-lg hover:shadow-xl transition-all duration-300'>
            <div className='absolute top-4 right-4 bg-gray-100 text-gray-600 font-bold text-lg rounded-full h-10 w-10 flex items-center justify-center'>2</div>
            <img className='max-w-10' src={assets.remove_bg_icon} alt="Remove BG Icon"/>
            <div>
                <p className='text-xl font-medium'>Remove Background</p>
                <p className='text-sm text-neutral-500 mt-1'>Our AI-powered tool will automatically detect and remove the background in seconds.</p>
            </div>
        </div>

        {/* Step 3 */}
        <div className='relative flex flex-col items-start gap-4 bg-white border drop-shadow-md p-7 rounded-lg hover:shadow-xl transition-all duration-300'>
            <div className='absolute top-4 right-4 bg-gray-100 text-gray-600 font-bold text-lg rounded-full h-10 w-10 flex items-center justify-center'>3</div>
            <img className='max-w-10' src={assets.download_icon} alt="Download Icon"/>
            <div>
                <p className='text-xl font-medium'>Download Image</p>
                <p className='text-sm text-neutral-500 mt-1'>Download your new image with a transparent background in high resolution.</p>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Steps