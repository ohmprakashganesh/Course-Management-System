import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./header.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom"

const Header = () => {
  const [click, setClick] = useState(false)
 const nav= useHistory();
  const [searchInput, setSearchInput] = useState(""); // State to store search input


  const handleSearch = (e) => {
    e.preventDefault();
    if(searchInput != null){
      localStorage.setItem('search',searchInput);
      nav.push(`/courses?search=${searchInput}`);
      window.location.reload();

    }else{
      alert("serarch is no set in local")
    }
  };


  return (
    <>
      {/* <Head /> */}
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/courses'>All Courses</Link>
            
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
             
            </li>
          </ul>
          <form className="mt-5" onSubmit={handleSearch}>
            <div className="flex items-center space-x-4">
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="search"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)} // Update search input state
              />
              <input
                type="submit"
                value="Search"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition duration-300 ease-in-out"
              />
            </div>
          </form>
          <div className='start'>
            <div className='button'>LEVEL UP YOUR LEARNING</div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
