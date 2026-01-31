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
      className={`flex items-center gap-4 ${additionalStyles}`}
    >
      {socialMediaIconWithLinks.map((link) => (
        <Link
          href={link.link}
          target="_blank"
          key={link.label}
          rel="noopener noreferrer"
          title={link.label}
          className="hover:scale-110 transition-all duration-300 hover:text-primary"
        >
          {link.label === "LinkedIn" ? (
            <FaLinkedin size={20} />
          ) : link.label === "Email" ? (
            <MdOutlineMail size={22} />
          ) : link.label === "Twitter" ? (
            <FaTwitter size={20} />
          ) : (
            <FaGithub size={20} />
          )}
        </Link>
      ))}
    </div>
  );
};

export default SocialHandles;
