import React from 'react'

function NavBar() {
  return (
    <div className=' w-screen  bg-black  flex items-center justify-between text-xl  pr-10 pl-10  font-medium' >
        <div><img className = 'h-14' src="https://i.pinimg.com/originals/14/e5/84/14e584760464db3248dd7c57e15d577a.jpg" alt="" /></div>
        <div>Youtube PlayList Analyzer</div>
        <div>Contact me</div>
    </div>
  )
}

export default NavBar