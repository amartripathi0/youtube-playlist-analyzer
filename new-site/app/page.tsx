import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import Footer from "./components/footer";
import About from "./components/about";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 relative w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 ">
      {/* <ToastContainer position="bottom-right" className={"bottom-10 text-sm"} /> */}
      {/* <Analytics /> */}
      <NavBar />
      <HomePage />
      <About />
      <Footer />
    </div>
  );
}
