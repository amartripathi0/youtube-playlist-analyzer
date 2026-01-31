import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import SocialHandles from "./SocialHandles";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export default function NavBar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className="w-full max-w-5xl glass h-14 md:h-16 px-4 md:px-6
        flex items-center justify-between rounded-full 
        border border-white/20 dark:border-white/10
        shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] transition-all duration-500 hover:scale-[1.01]"
      >
        <Link href="/" className="flex items-center gap-3 h-full group">
          <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-500">
            <Image
              src={'/logo.png'}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Logo"
            />
          </div>

          <span className="text-sm font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 max-sm:hidden">
            PLAYLIST ANALYZER
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-2">
            <SocialHandles additionalStyles="text-muted-foreground/60 hover:text-foreground transition-all gap-1.5" />
          </div>
          <div className="h-4 w-px bg-border/60 mx-1" />
          <ThemeToggle />
          <Link
            href="https://amartripathi.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex px-5 py-2 text-xs font-black uppercase tracking-widest rounded-full bg-foreground text-background hover:bg-primary hover:text-white transition-all duration-300 items-center gap-2 group shadow-lg shadow-black/5 dark:shadow-white/5"
          >
            Portfolio
            <BsArrowRight className="-rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
