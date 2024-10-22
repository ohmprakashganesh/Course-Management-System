import { Button } from '@mui/material'
import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom';


const CourseDetails = () => {
  const navigate=useHistory();

//   const courseData=[
//     {
//       id:1,
//       name:"java",
//       price:1200,
//       Instructor:{
//         id:1,
//         name:"raju",
//         email:"rajubhaiya"
        
//       }

//   },
//   {
//     id:2,
//     name:"php",
//     price:1900,
//     Instructor:{
//       id:4,
//       name:"ram",
//       email:"sita email"
//     }

// }
// ];

const [courses, setCourses]=useState([]);

useEffect(() => {
  fetch('http://localhost:8080/api/course/')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error("Error fetching user", error));
}, []);


const handleDelete = (cid) => {
  fetch(`http://localhost:8080/api/course/delete/${cid}`, {
      method: 'DELETE'
  })
  .then(() => {
      // After deletion, update the list by filtering out the deleted instructor based on iid
      setCourses(courses.filter(course => course.cid !== cid));
  })
  .catch(error => console.error("Error deleting instructor", error));
};
  
  return (
    <><div className='text-center flex justify-center flex-col'>
      <h1 className='text-3xl font-bold mt-10'>Table Containing List Of Course</h1>
    </div>
    <div className='w-full  flex justify-center'>
      <table  class=" w-5/6 mt-4  table-fixed ">
  <thead className='bg-slate-400 mt-5 h-12'>
    <tr>
      <th>name</th>
      <th>instructor</th>
      <th>price</th>
      <th>Action</th>
    </tr>
  </thead>
  {courses.length > 0 ? (
  <tbody>
    {courses.map((course)=>
    (
      <tr>
      <td className='h-12 text-center'>{course.name}</td>
      <td className='h-12 text-center'>{course.instructor.name}</td>
      <td className='h-12 text-center'>{course.price}</td>
      <td className='h-12 text-center'>
      <Button onClick={() => handleDelete(course.cid)}>Delete</Button>
      </td>
    </tr>
    ))}
   
  </tbody>
  ):(
    <>
    <p> loading ...</p>
    </>
  )
};
</table>

    </div>
    </>
  )
}

export default CourseDetails
