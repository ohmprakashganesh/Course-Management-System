import React from 'react'
import { getCourseById } from '../../backendServices/Course'

const CourseServices = () => {
  return (
    <div>
        <h1> getting single course </h1>
        getCourseById(5)
        

      
    </div>
  )
}

export default CourseServices
