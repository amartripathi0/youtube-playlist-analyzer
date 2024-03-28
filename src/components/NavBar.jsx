import { socialMediaIconWithLinks } from "../constants";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 backdrop:blur-md w-screen h-16 bg-gradient-to-r from-slate-900 to-slate-700  flex items-center justify-between text-xl max-md:text-lg max-sm:text-base px-20 max-sm:px-5 font-medium max-sm:gap-10">
      <a href="/" k className="flex items-center justify-center gap-4 h-4/5 ">
        <FaYoutube size={20} color="#FF0000" />

        <h1>Youtube Playlist Analyzer</h1>
      </a>

      <div className="flex gap-6 max-sm:gap-3">
        {socialMediaIconWithLinks.map((link) => (
          <a
            href={link.link}
            target="_blank"
            key={link.label}
            rel="noopener noreferrer"
          >
            {link.label === "LinkedIn" ? (
              <FaLinkedin size={20} />
            ) : (
              <FaGithub size={20} />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}
