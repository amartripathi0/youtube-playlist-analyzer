import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { socialMediaIconWithLinks } from "../constants";

function SocialHandles() {
  return (
    <div className="flex gap-6 max-sm:gap-3 justify-between items-center">
      {socialMediaIconWithLinks.map((link) => (
        <a
          href={link.link}
          target="_blank"
          key={link.label}
          rel="noopener noreferrer"
          className="hover:scale-110  hover:transition-all hover:shadow-sm hover:shadow-purple-500 ease-in-out duration-400"
        >
          {link.label === "LinkedIn" ? (
            <FaLinkedin size={20} />
          ) : link.label === "Email" ? (
            <MdOutlineMail size={23} />
          ) : (
            <FaGithub size={20} />
          )}
        </a>
      ))}
    </div>
  );
}

export default SocialHandles;
