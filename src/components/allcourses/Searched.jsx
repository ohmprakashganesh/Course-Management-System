import React, { useEffect, useState } from "react"
import "./courses.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom"
import { useLocation } from "react-router-dom";

const Searched = () => {
  const nav=useHistory();

  const [course, setCourse] = useState([]);
useEffect(()=>{
    fetch(`http://localhost:8080/api/course/`)
    .then(Response=>Response.json())
    .then(data=>{setCourse(data);
    }).catch(error => console.error("Error fetching user", error));
  

  },[]);
 
  const handleEnroll = (id) => {
    nav.push(`/om/${id}`);
  };
 
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';
  const location = useLocation();
  {searchQuery ? alert(searchQuery):alert("not found")}


  return (
    <>
    {course.length > 0 ? (
      <section className='coursesCard'>
        <div className='container grid2'>
          {course.map((val) => (
            <div className='items' key={val.cid}>
              <div className='content flex'>
                <div className='left'>
                  <div className='img'>
                    <p>{val.image}</p>
                  </div>
                </div>
                <div className='text'>
                  <h1>{val.name}</h1>
                  <p>{val.description}</p>
                  <div className='details'>
                    {/* Since each course has one instructor */}
                    <div className='box'>
                      <div className='dimg'>
                        <p> Course BY:{val.instructor.name} </p>
                      </div>
                    </div>
                    <span>Instructor Name: {val.instructor.name}</span>
                    {/* <span>Instructor ID: {val.instructor.id}</span> 
                    <span>Instructor Name: {val.instructor.name}</span>
                     <span>Instructor Role: {val.instructor.role}</span>  */}
                  </div>
                </div>
              </div>
              <div className='price'>
                <h3>{val.price} Free </h3>
                {/* <h3>{val.video}  </h3> */}
              </div>
              <button className='outline-btn'  onClick={() => handleEnroll(val.cid)} >ENROLL NOW Free!</button>
            </div>
          ))}
        </div>
      </section>
    ) : (
      <p>No courses found</p>
    )}
  </>
  )
}

export default Searched;
