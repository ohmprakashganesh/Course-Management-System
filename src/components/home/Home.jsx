import React from "react"
import AboutCard from "../about/AboutCard"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
import Testimonal from "./testimonal/Testimonal"
import Footer from "../common/footer/Footer"
import Header from "../common/header/Header"

const Home = () => {
  return (
    <>
    <Header/>
      <Hero />
      <AboutCard />
      <HAbout />
      <Testimonal />
      <Footer/>

   
    </>
  )
}

export default Home
