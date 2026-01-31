import Footer from "@/components/footer";
import HomePage from "@/components/HomePage";
import NavBar from "@/components/navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-[120px] dark:opacity-30 animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-indigo-500/10 to-transparent blur-[120px] dark:opacity-30 animate-pulse-slow delay-1000" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[100px] dark:opacity-20" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar />

        <div className="flex-grow py-8 md:py-12">
          <HomePage />
        </div>

        <Footer />
      </div>
    </main>
  );
}
