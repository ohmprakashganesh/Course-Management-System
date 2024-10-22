import React, { useEffect, useState } from "react";
import "./courses.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Header from "../common/header/Header";
import { useLocation } from "react-router-dom";

const CoursesCard = () => {
  const nav = useHistory();
  const location = useLocation();
  const [state, setState] = useState(false); // Whether search is active or not

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';

  const [filter, setFilter] = useState([]);
  const [course, setCourse] = useState([]);

  // Fetch all courses initially
  useEffect(() => {
    fetch(`http://localhost:8080/api/course/`)
      .then(response => response.json())
      .then(data => setCourse(data))
      .catch(error => console.error("Error fetching courses", error));
  }, []);

  // Fetch filtered courses based on search query
  useEffect(() => {
    if (searchQuery) {
      fetch(`http://localhost:8080/api/course/search?name=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
          setFilter(data);
          setState(true);  // Set state to true if there was a search
        })
        .catch(error => console.error("Error fetching filtered courses", error));
    }
  }, [searchQuery]);

  // Handle enroll action
  const handleEnroll = (id) => {
    nav.push(`/om/${id}`);
  };

  return (
    <>
      <Header />
      {/* Display courses based on whether the search query is active or not */}
      {state ? (
        filter.length > 0 ? (
          <section className='coursesCard'>
            <div className='container grid2'>
              {filter.map((val) => (
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
                        <span>Course BY: {val.instructor.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className='price'>
                    <h3>{val.price} Free </h3>
                  </div>
                  <button className='outline-btn' onClick={() => handleEnroll(val.cid)}>
                    ENROLL NOW Free!
                  </button>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <p>No courses found for your search</p>
        )
      ) : (
        course.length > 0 ? (
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
                        <span>Course BY: {val.instructor.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className='price'>
                    <h3>{val.price} Free </h3>
                  </div>
                  <button className='outline-btn' onClick={() => handleEnroll(val.cid)}>
                    ENROLL NOW Free!
                  </button>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <p>No courses available</p>
        )
      )}
    </>
  );
};

export default CoursesCard;
