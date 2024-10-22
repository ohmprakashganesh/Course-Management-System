import { Divider } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import Person2Icon from '@mui/icons-material/Person2';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Sidebar = ({handleBoxClick}) => {

  const history= useHistory();
  const user = JSON.parse(localStorage.getItem('user'));
   
  const handleHomeClick = () => {
    window.location.reload(); // This will reload the page
  };

  const navigate=useHistory();

  const handleLogOut=()=>{

    navigate.push('/login');
    window.location.reload(); // This will reload the page


  }
  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push('/')
    window.location.reload();


};


  return (
    <div className='flex h-fit text-white  shadow-slate-300 text-pretty flex-col'>
        <ul className='text-xl scroll-mt-5'>
            <li className='h-10 cursor-pointer ' onClick={handleHomeClick}> <span className='mx-5'><HomeIcon/></span>Dashboard</li>
            <li className='h-10 cursor-pointer' > <span className='mx-5'onClick={()=> handleBoxClick('CourseDetails')}><LibraryBooksIcon/></span>all Courses</li>
            <li className='h-10 cursor-pointer' > <span className='mx-5' onClick={()=> handleBoxClick('InstructorDetails')}><Person2Icon/></span>All Instructors</li>
            <Divider/>
            <li className='h-10 cursor-pointer' onClick={handleLogout} > <span className='mx-5'><LogoutIcon/> </span>Log out</li>

        </ul>
      

    </div>
  )
}

export default Sidebar
