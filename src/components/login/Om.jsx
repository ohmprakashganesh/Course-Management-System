import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Om = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({
    name: '',
    price: '',
    description: '',
    video: ''
  });

  useEffect(() => {
    console.log("Fetching course with ID:", id); // Check if ID is correct
    const fetchCourseDetails = () => {
      fetch(`http://localhost:8080/api/course/${id}`)
        .then(response => response.json())
        .then(courseData => {
          console.log("Fetched course data:", courseData); // Log the fetched data
          setCourse(courseData);
        })
        .catch(error => {
          console.error('Error fetching course details:', error);
        });
    };
  
    fetchCourseDetails();
  }, [id]);// Add id as a dependency to refetch if it changes

  const isVideoFile = (fileName) => {
    return fileName && (fileName.endsWith('.wmv') || fileName.endsWith('.mp4') || fileName.endsWith('.ogg'));
  };

  const isPdfFile = (fileName) => {
    return fileName && fileName.endsWith('.pdf');
  };

  return (
    <div>
      <h1>Course Details</h1>
      <div id="course-container">
        <p><strong>Course Name:</strong> {course.name}</p>
        <p><strong>Course Price:</strong> {course.price}</p>
        <p><strong>Description:</strong> {course.description}</p>

        <div id="video-container">
          <p><strong>Course Content:</strong></p>
          {course.video ? (
            isVideoFile(course.video) ? (
              <video id="course-video" className='w-full h-fit' controls>
               <source src={ `http://localhost:8080/videos/${course.video}`} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            ) : isPdfFile(course.video) ? (
              <iframe 
                src={`http://localhost:8080/videos/${course.video}`} 
                width="600" 
                height="800" 
                title="Course PDF" 
                
              >
                This browser does not support PDFs. Please download the PDF to view it: <a href={`http://localhost:8080/static/videos/${course.video}`}>Download</a>
              </iframe>
            ) : (
              <p>Unsupported file type.</p>
            )
          ) : (
            <p>No video or document available for this course.</p>
          )}
        </div> 
      </div> 
    </div>
  );
};

export default Om;
