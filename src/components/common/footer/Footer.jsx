import React from "react"
import { blog } from "../../../dummydata"
import "./footer.css"

const Footer = () => {
  return (
    <>
      <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row flex justify-center text-center'>
            <h1 className="text-center"> Stay tune and get the latest update</h1>
            
          </div>
        </div>
      </section>
      <footer>
        <div className='container  flex justify-around'> 
          <div className='box logo ml-5'>
            <h1>Course Management System </h1>
            <span>ONLINE EDUCATION & LEARNING</span>
            <p>Enroll any course and be a gentle man and smart to deals the world problems</p>

            </div>
          <div className='box link'>
            <h3>Explore</h3>
            <ul>
              <li>About Us</li>
              <li>Services</li>
              <li>Courses</li>
              <li>Blog</li>
              <li>Contact us</li>
            </ul>
          </div>
     
          <div className='box last'>
            <h3>Have a Questions?</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                 Aabgachi 2 bhadarpur / 405 
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                +977 9803452865
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                LearningM@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          Copyright ©2022 All rights reserved | This template is made with <i className='fa fa-heart'></i> by GorkhCoder
        </p>
      </div>
    </>
  )
}

export default Footer
