import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import SocialHandles from "./SocialHandles";
import Link from "next/link";
export default function NavBar() {
  return (
    <nav
      className="rounded-lg h-12 md:h-14 md:px-4 px-2
     flex items-center justify-between sm:text-lg text-base mx-4 md:mx-20 lg:mx-44 
     bg-gradient-to-r from-pink-200  to-purple-100
     font-medium max-sm:gap-10 border border-neutral-300 shadow-md text-neutral-800"
    >
      <Link href="/" className="flex items-center justify-center gap-2 h-4/5">
        {/* <FaYoutube size={20} color="#FF0000" /> */}
        <Image
          src={'/logo.png'}
          height={100}
          width={100}
          className="h-[90%] aspect-square w-fit rounded-full hover:scale-105 hover:transition-all duration-150"
          alt="Youtube Playlist Analyzer"
        />

        <h1 className="text-base hover:text-neutral-900 transition-colors duration-150 max-sm:hidden">
          Youtube Playlist Analyzer
        </h1>
      </Link>
      <div className="flex">
        <SocialHandles additionalStyles={"max-sm:hidden"} />
        <a
          href="https://amartripathi.vercel.app"
          target="_blank"
          rel="noreferrer"
          title="Visit Creator's Portfolio - Amar Tripathi"
          className="ml-4 text-sm bg-purple-200 hover:text-neutral-900 border-pink-300 hover:opacity-100 font-bold hover:scale-105 border p-2 py-1.5 rounded duration-150 flex justify-center items-center gap-1 shadow-sm transition-all"
        >
          Creator Portfolio <BsArrowRight className="-rotate-45" />{" "}
        </a>
      </div>
    </nav>
  );
}
