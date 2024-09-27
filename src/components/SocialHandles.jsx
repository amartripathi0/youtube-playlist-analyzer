import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { socialMediaIconWithLinks } from "../constants";

function SocialHandles() {
  return (
    <div className="flex sm:gap-4 gap-3 justify-between items-center">
      {socialMediaIconWithLinks.map((link) => (
        <a
          href={link.link}
          target="_blank"
          key={link.label}
          rel="noopener noreferrer"
          className="hover:scale-105 hover:transition-all opacity-80 hover:opacity-100 hover:shadow-sm ease-in-out duration-400 hover:text-pink-200"
        >
          {link.label === "LinkedIn" ? (
            <FaLinkedin size={18} />
          ) : link.label === "Email" ? (
            <MdOutlineMail size={21} />
          ) :  (
            <FaGithub size={18} />
          )}
        </a>
      ))}
    </div>
  );
}

export default SocialHandles;
