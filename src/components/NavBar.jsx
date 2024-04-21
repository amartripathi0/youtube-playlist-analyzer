import {websiteLogo } from "../constants";
import SocialHandles from "./SocialHandles";

// import { FaYoutube } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 backdrop:blur-md w-screen h-16 
    bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-900  
    flex items-center justify-between text-lg max-md:text-lg max-sm:text-base px-20 max-sm:px-5 font-medium max-sm:gap-10">
      <a href="/" k className="flex items-center justify-center gap-4 h-4/5 ">
        {/* <FaYoutube size={20} color="#FF0000" /> */}
        <img src={websiteLogo} className="h-5/6 rounded-full hover:scale-105 hover:transition-all duration-150" alt="" />

        <h1>Youtube Playlist Analyzer</h1>
      </a>

      <SocialHandles/>
    </nav>
  );
}
