import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter } from 'lucide-react'
const Footer = () => {
    return (
        <div className='mx-4 lg:mx-44 py-8 border-t mt-20'>
            <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-6'>
                <div className='flex flex-col items-center sm:items-start gap-y-4'>
                    <Link to='/'><img className='w-32' src={assets.logo} alt="Logo" /></Link>
                    <p className='text-sm text-gray-500'>© 2024 BG-Remover. All rights reserved.</p>
                </div>
                <div className='flex gap-x-6'>
                    <a href="https://github.com/devlopersumit" target='_blank'><Github className='w-6 h-6 cursor-pointer' /></a>
                    <a href=" https://www.linkedin.com/in/sumit-jha?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
" target='_blank'><Linkedin className='w-6 h-6 cursor-pointer' /></a>
                    <a href="https://x.com/_sumitjha_?t=4nSWLPjfWOEhS06PoX9-Lg&s=09 " target='_blank'><Twitter className='w-6 h-6 cursor-pointer' /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer