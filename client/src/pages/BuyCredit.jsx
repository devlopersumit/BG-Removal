import React from 'react'
import { assets } from '../assets/assets'

const BuyCredit = () => {
  return (
    <div className='mx-4 my-3 lg:mx-44 mt-14 min-h-[55vh]'>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl sm:text-5xl font-bold text-center'>Buy Credits</h1>
        <p className='text-center mt-4 text-gray-600 max-w-2xl'>Purchase credits to use our background removal service. Each credit allows you to process one image.</p>
        <div className='mt-12 border shadow-lg rounded-xl p-6 sm:p-10 w-full max-w-md'>
          <div className='flex items-center gap-x-4'>
            <img src={assets.credit_icon} alt="Credit Icon" className='w-10 sm:w-12' />
            <div>
              <h2 className='text-xl sm:text-2xl font-semibold'>Unlimited Credit</h2>
              <p className='text-sm text-gray-500'> 
                Unlimited background removal with unlimited credits. No credit card required.
              </p>
            </div>
          </div>
          <p className='text-4xl sm:text-5xl font-bold my-6 text-center'>$5.00</p>
          <button className='w-full bg-zinc-800 text-white py-3 rounded-full text-lg font-semibold hover:bg-zinc-700 transition-colors'>
            Purchase
          </button>
          <p className='text-xs text-gray-500 mt-4 text-center'>One-time payment. Secure checkout.</p>
        </div>
      </div>
    </div>
  )
}

export default BuyCredit