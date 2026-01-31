import SocialHandles from "./SocialHandles";

function Footer() {
  return (
    <footer className="w-full py-16 px-6 border-t border-border/40 bg-secondary/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-sm font-black tracking-widest text-foreground opacity-60 uppercase">Playlist Analyzer</p>
          <p className="text-xs text-muted-foreground font-medium">Precision tools for modern creators.</p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-center gap-4">
            <SocialHandles additionalStyles="text-muted-foreground/60 hover:text-foreground transition-all gap-2" />
          </div>
          <p className="text-[10px] text-muted-foreground/40 font-black uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED
          </p>
        </div>
      </div>

      <div className="mt-12 text-center text-[10px] font-black tracking-[0.3em] uppercase opacity-20 select-none">
        Crafted with pride by <a href="https://amartripathi.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Amar Tripathi</a>
      </div>
    </footer>
  );
}

export default Footer
