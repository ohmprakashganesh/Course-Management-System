import React from 'react'
import Sidebar from './Sidebar'
import Boxes from './Boxes'
import { useState } from 'react'
import CourseDetails from './CourseDetails'
import InstructorDetails from './InstructorDetails'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
const Admin = () => {
    const history = useHistory(); // Correctly use useHistory

    const user= JSON.parse(localStorage.getItem('user'));
    if(user.role != 'admin'){
      history.push('/')
    }

    const [activeComponent, setActiveComponent] = useState("InstructorDetails"); // null means none is shown

    // Handler for box clicks
    const handleBoxClick = (component) => {
        setActiveComponent(component); // Set the component based on the box clicked
    };

    return (
        <div>
           
           <div className='flex gap-3 max-h-1.5 '>
    <div className='w-1/6 flex flex-col items-center max-h-screen h-screen  justify-items-center bg-slate-500'> {/* Adjusted width */}
        <h2 className='font-extrabold text-2xl my-5'>hello side bar</h2>
        <Sidebar handleBoxClick={handleBoxClick}  />
    </div>
   
    <div className='w-5/6  bg-orange-400'>
        <div className='w-full h-56 pt-2    bg-slate-500'>
            <Boxes handleBoxClick={handleBoxClick} />
        </div>
        <div className='w-full h-screen bg-slate-50'>
      {activeComponent==='CourseDetails' &&  <CourseDetails/>}
      {activeComponent==='InstructorDetails' &&  <InstructorDetails/>}
        </div>
    </div>
</div>


        </div>
    )
}

export default Admin
