import About from "@/components/about";
import Footer from "@/components/footer";
import HomePage from "@/components/HomePage";
import NavBar from "@/components/navbar";

export default function Home() {
  return (
    <main className="flex flex-col gap-3 relative py-4 md:py-6 w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 ">
      <NavBar />
      <HomePage />
      <About />
      <Footer />
    </main>
  );
}
