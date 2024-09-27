import "./App.css";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/footer";

function App() {

  return (
    <div className="flex flex-col gap-3 relative w-screen h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <ToastContainer position="bottom-right"/>
      <Analytics />
      <NavBar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
