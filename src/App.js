import "./App.css"
import Instructor from "./backendServices/Instructor"
import { BrowserRouter as Router,  Route } from "react-router-dom"
import Login from "./components/login/Login"
// import Mainpage from "./components/landpageroute/Mainpage"
import Signup from "./components/login/Signup"
import CourseForm from "./components/login/CourseForm"
import Contact from "./components/contact/Contact"
import Admin from "./components/Admin/Admin"
import EditPage from "./components/login/EditPage"
import CourseHome from "./components/allcourses/CourseHome"
import { Switch } from "react-router-dom/cjs/react-router-dom.min"
import CourseFormEdit from "./components/login/CourseFormEdit"
import About from "./components/about/About"
import Home from "./components/home/Home"
import Searched from "./components/allcourses/Searched"
import Instructor1 from "./components/Instructor/Instructor"
import Head from "./components/common/header/Head"
import Om from "./components/login/Om"
function App() {

  
  return (
    <>
      <Router>
      <Head  />
       <Route exact  path="/instructordash" component={Instructor1}/>
      {/* <Header  /> */}
      <Route exact path='/' component={Home} />
        <Switch>
        <Route exact path='/courses' component={CourseHome} />
          <Route exact path='/courses' component={CourseHome} />
          <Route exact path='/about' component={About} />
          <Route exact path='/contact' component={Contact} />
        </Switch>
       
             <Route exact path='searched' component ={Searched} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact  path="/getuser" component={Instructor}/>
            <Route exact  path="/courseform" component={CourseForm}/>
            <Route exact  path="/admin" component={Admin}/>
            <Route path="/om/:id" component={Om} />   

            <Route exact  path="/update/:id" component={EditPage}/>
            <Route exact path="/updatecourse/:cid" component={CourseFormEdit}/>
      </Router>
    </>
  )
}

export default App
