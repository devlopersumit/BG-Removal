import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Scissors } from 'lucide-react' 
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useEffect } from 'react'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { isSignedIn } = useUser()
  const{credit, loadCreditsData} = useContext(AppContext)

  useEffect(() => {
   if(isSignedIn){
    loadCreditsData();
   }
  },[isSignedIn])

  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
      
      {/* --- CleanCut Logo --- */}
      <Link to="/" className="flex items-center gap-2 group select-none">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl text-white">
          <Scissors size={20} strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-800 group-hover:text-zinc-900 transition-colors">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
            CleanCut
          </span>
        </h1>
      </Link>

      {/* --- Right Section --- */}
      <div className="flex items-center gap-4">
        <Link
          to="/buy"
          className="hidden sm:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full hover:bg-slate-200 transition"
        >
          <img className="w-6" src={assets.credit_icon} alt="" />
          <p className="text-sm font-medium text-zinc-700">Buy Credits</p>
        </Link>

        {isSignedIn ? (
          <div className="flex items-center gap-2">
            <UserButton />
          </div>
        ) : (
          <button
            onClick={() => openSignIn({})}
            className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white flex items-center gap-3 px-5 py-2 sm:px-8 sm:py-3 text-sm rounded-full hover:opacity-90 transition"
          >
            Get Started
            <img className="w-3 sm:w-4" src={assets.arrow_icon} alt="Arrow" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
