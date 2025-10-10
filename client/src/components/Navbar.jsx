import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Scissors } from "lucide-react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credit, loadCreditsData } = useContext(AppContext);

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData();
    }
  }, [isSignedIn]);

  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
      
      {/* --- Logo Section --- */}
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
        
        {/* Buy Credits Link */}
        <Link
          to="/buy"
          className="hidden sm:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full hover:bg-slate-200 transition"
        >
          <img className="w-6" src={assets.credit_icon} alt="Credits" />
          <p className="text-sm font-medium text-zinc-700">Buy Credits</p>
        </Link>

        {/* Signed-in Section */}
        {isSignedIn ? (
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Credits Display */}
            <button className="flex items-center gap-2 bg-blue-100 px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-700">
              <img className="w-5" src={assets.credit_icon} alt="Credits" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                {credit}
              </p>
            </button>

            {/* User Name */}
            {user && (
              <p className="text-gray-600 max-sm:hidden">
                Hi, {user.fullName || `${user.firstName} ${user.lastName}`}
              </p>
            )}

            {/* User Button */}
            <UserButton />
          </div>
        ) : (
          <button
            onClick={() => openSignIn({})}
            className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white flex items-center gap-3 px-5 py-2 sm:px-8 sm:py-3 text-sm rounded-full hover:opacity-90 transition"
          >
            Get Started
            <img
              className="w-3 sm:w-4"
              src={assets.arrow_icon}
              alt="Arrow"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
