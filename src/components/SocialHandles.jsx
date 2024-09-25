import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { socialMediaIconWithLinks } from "../constants";
import { CgArrowRight } from "react-icons/cg";

function SocialHandles() {
  return (
    <div className="flex gap-5 max-sm:gap-3 justify-between items-center">
      {socialMediaIconWithLinks.map((link) => (
        <a
          href={link.link}
          target="_blank"
          key={link.label}
          rel="noopener noreferrer"
          className="hover:scale-105 hover:transition-all opacity-80 hover:opacity-100 hover:shadow-sm ease-in-out duration-400 hover:text-pink-200"
        >
          {link.label === "LinkedIn" ? (
            <FaLinkedin size={20} />
          ) : link.label === "Email" ? (
            <MdOutlineMail size={23} />
          ) :  (
            <FaGithub size={20} />
          )}
        </a>
      ))}
    </div>
  );
}

export default SocialHandles;
