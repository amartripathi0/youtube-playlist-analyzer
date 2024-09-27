import "./App.css";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/footer";
import About from "./components/about";

function App() {

  return (
    <div className="flex flex-col gap-3 relative w-screen h-screen bg-gradient-to-r from-rose-100 to-teal-100 ">
      <ToastContainer position="bottom-right" className={"bottom-10 text-sm"} />
      <Analytics />
      <NavBar />
      <HomePage />
      <About/>
      <Footer />
    </div>
  );
}

export default App;
