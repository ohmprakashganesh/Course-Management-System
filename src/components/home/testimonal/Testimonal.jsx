import React from "react"
import { online } from "../../../dummydata"
import Heading from "../../common/heading/Heading"
import "./style.css"

const Testimonal = () => {
  return (
    <>
      {/* <section className='testimonal padding'>
        <div className='container'>
          <Heading subtitle='TESTIMONIAL' title='Our Top  courses' />

          <div className='content grid2'>
            {online.map((val) => (
              <div className='items shadow'>
                <div className='box flex'>
                  <div className='img'>
                    <img src={val.cover} alt='' />
                    <i className='fa fa-quote-left icon'></i>
                  </div>
                  <div className='name'>
                    <h2>{val.courseName}</h2>
                    <span>{val.post}</span>
                  </div>
                </div>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </>
  )
}

export default Testimonal
