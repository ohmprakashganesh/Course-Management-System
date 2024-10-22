import { Button } from "@mui/material"
import React from "react"
import { Link,useLocation } from "react-router-dom/cjs/react-router-dom";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
const Head = ({ }) => {
  const navigate = useHistory();
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('user'));
 
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate.push('/')
    window.location.reload();
};

  const handleLogin = () => {
    navigate.push('/login');
    window.location.reload();

  };

  const handleSignUp = () => {
    navigate.push('/signup');
    window.location.reload();


  };
  return (
    <>
      <section className='head '>
        <div className='container flexSB h-16 w-screen'>
          <div className='logo'>
          <h1 className="ml-5 mt-1.5 hover:bg-gray-200 hover:rounded-full hover:px-4 hover:py-2 transition duration-300 ease-in-out cursor-pointer">
  CMS
</h1>
            <span></span>
          </div>
          {user ? (
            <div className='social mr-2'>
              <p className="text-black">
              {user.role === 'instructor' ? (
        location.pathname === "/instructordash" ? (
          <Button
          variant='contained'
          onClick={handleLogout}
          sx={{ width: 100 , marginRight:5 ,marginTop:1.5}}
         >
          Log Out
         </Button>
        ) : (<div>
          <Link to="/instructordash">
            <PeopleAltIcon sx={{ fontSize: 50, color: "black" , marginRight:3}} />
          </Link>

           <Link to="/courseform">
          <Button variant="contained" sx={{marginRight:3}}>ADD Course</Button>
         </Link> 
         </div>

        )
      ) : (
                  <>
                    <Link to="/admin">
                      <PeopleAltIcon sx={{ fontSize: 50, color: "black" }} className="hover:bg-gray-200 hover:rounded-full hover:px-4 hover:py-2 transition duration-300 ease-in-out cursor-pointer" /> Profile
                    </Link>
                  </>
                )}
                 
                 

              </p>
            </div>
          ) : (
            <>
              <div className="mr-10">
                <Button className="shadow-lg  " sx={{ marginRight: 3 }} onClick={handleLogin}>Log in</Button>
                <Button className="shadow-xl" onClick={handleSignUp}>Sign up</Button>
              </div>
            </>
          )}



        </div >
      </section >
    </>
  )
}

export default Head
