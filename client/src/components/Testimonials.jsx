import React from 'react'
import { testimonialsData } from '../assets/assets'

const Testimonials = () => {
  return (
    <div className='mx-4 lg:mx-44 py-20 xl:py-24'>
      {/* Title */}
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-5'>Customer Testimonials</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8'>

        {testimonialsData.map((item, index) => {
            return <div key={index} className='flex flex-col justify-between gap-4 bg-white border drop-shadow-md p-3 rounded-lg hover:shadow-xl transition-all duration-300'>
            <p className='text-6xl text-gray-200 font-serif'>"</p>
            <p className='text-gray-600 italic'>{item.text}</p>
            <div className='flex items-center gap-4 mt-4'>
                <img className='w-12 h-12 rounded-full object-cover' src = {item.image} alt="Customer" />
                <div>
                    <p className='font-semibold text-gray-800'>{item.author}</p>
                    <p className='text-sm text-gray-500'>{item.jobTitle}</p>
                </div>
            </div>
            </div>
        })}
      </div>
    </div>
  )
}

export default Testimonials