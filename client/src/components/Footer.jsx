import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter, Scissors } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="mx-4 lg:mx-44 py-10 border-t border-zinc-200 mt-20">
      <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-6">
        
        {/* --- Left Section (Logo + Copyright) --- */}
        <div className="flex flex-col items-center sm:items-start gap-y-3">
          <Link to="/" className="flex items-center gap-2 select-none">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl text-white">
              <Scissors size={18} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-semibold text-zinc-800">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                CleanCut
              </span>
            </h1>
          </Link>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CleanCut. All rights reserved.
          </p>
        </div>

        {/* --- Right Section (Social Links) --- */}
        <div className="flex gap-x-6 text-zinc-600">
          <a
            href="https://github.com/devlopersumit"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-900 transition"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/sumit-jha?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-900 transition"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://x.com/_sumitjha_?t=4nSWLPjfWOEhS06PoX9-Lg&s=09"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-900 transition"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
