import React, { useState } from 'react'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import { useEffect } from 'react';
const Boxes = ({handleBoxClick}) => {
  const [courses, setCourses]=useState([]);
  const [users, setUsers]=useState([]);


  useEffect(() => {
    fetch('http://localhost:8080/api/instructor')
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error("Error fetching user", error));
}, []);

useEffect(() => {
  fetch('http://localhost:8080/api/course/')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error("Error fetching user", error));
}, []);

 
  return (
    <div className=' flex h-1/2 flex-row justify-around'>

        <div id='box1' className='w-1/5 rounded-2xl bg-slate-200 h-52'
        onClick={()=> handleBoxClick('CourseDetails')}>
              <div className="flex w-full h-full flex-col justify-center items-center text-center">
                
              <h1 className='font-bold text-wrap sm:text-sm  md:text-sm'> total number of Course</h1>
            <LibraryBooksIcon  style={{ fontSize: '102px' }}/>
            <p> {courses.length}</p>
          </div>
        </div>
        <div id='box2' className='w-1/5 rounded-2xl bg-slate-200 h-52'
                onClick={()=> handleBoxClick('InstructorDetails')}>
              <div className="flex w-full h-full flex-col justify-center items-center text-center">

                  <h1 className='font-bold  md:text-sm'> total number of Instructors</h1>
                  <PeopleAltIcon  style={{ fontSize: '102px' }} />
                  <p>{users.length}</p>
                  </div>
        <div>
         
          </div>
</div>


    </div>
  )
}

export default Boxes
