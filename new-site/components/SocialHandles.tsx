import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { socialMediaIconWithLinks } from "../constants";
import Link from 'next/link';

interface SocialHandlesProps {
  additionalStyles?: string;
}

const SocialHandles: React.FC<SocialHandlesProps> = ({ additionalStyles }: SocialHandlesProps) => {
  return (
    <div
      className={`${additionalStyles} flex sm:gap-4 gap-3 justify-between items-center`}
    >
      {socialMediaIconWithLinks.map((link) => (
        <Link
          href={link.link}
          target="_blank"
          key={link.label}
          rel="noopener noreferrer"
          className="hover:scale-110 hover:transition-all opacity-80 hover:opacity-100 hover:shadow-sm ease-in-out duration-200"
        >
          {link.label === "LinkedIn" ? (
            <FaLinkedin size={18} />
          ) : link.label === "Email" ? (
            <MdOutlineMail size={21} />
          ) : link.label === "Twitter" ? (
            <FaTwitter size={18} />
          ) : (
            <FaGithub size={18} />
          )}
        </Link>
      ))}
    </div>
  );
};

export default SocialHandles;
