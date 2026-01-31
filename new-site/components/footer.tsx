import Link from "next/link";
import SocialHandles from "./SocialHandles";

function Footer() {
  return (
    <footer className=" bg-neutral-900 h-10 sm:h-12 flex items-center justify-center gap-4 fixed w-screen bottom-0 text-white">
      <span className="font-medium text-xs sm:text-sm opacity-80 hover:opacity-100">
        Made By -{" "}
        <Link
          href="https://amartripathi.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="opacity-90 text-pink-100 hover:text-pink-200 transition-all duration-200 hover:underline"
        >
          {" "}
          Amar Tripathi
        </Link>
      </span> |
      <SocialHandles />
    </footer>
  );
}

export default Footer
