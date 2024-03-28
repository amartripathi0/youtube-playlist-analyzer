
import './App.css'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'

function App() {
  // const [count, setCount] = useState(0)

  return (

    <div className='flex flex-col gap-3 relative w-screen h-screen  '>

    <NavBar/>
    <HomePage/>

    
    <footer  className=' bg-black h-10 flex items-center justify-center fixed w-screen bottom-0'>Made By - Amar Tripathi</footer>


    </div>

  )
}

export default App
