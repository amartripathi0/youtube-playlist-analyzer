
import './App.css'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
import SocialHandles from './components/SocialHandles'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
function App() {
  // const [count, setCount] = useState(0)

  return (

    <div className='flex flex-col gap-3 relative w-screen h-screen 
bg-gradient-to-r from-rose-100 to-teal-100       
     '>

    <ToastContainer  className="mt-10"/>
    <NavBar/>
    <HomePage/>

    
    <footer  className=' bg-black h-14 flex items-center justify-center gap-6 fixed w-screen bottom-0'>

      <h1 className='font-medium text-base'>
      Made By - Amar Tripathi

      </h1>
    <SocialHandles/>
    </footer>


    </div>

  )
}

export default App
