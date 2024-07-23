import React from 'react'
import { BrowserRouter ,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'

import SignOut from './pages/SignOut'
import Profile from './pages/Profile'
import About from './pages/About'
import SignIn from './pages/SignIn'
import Header from './components/Header'
const App = () => {
  
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route  path='/' element={<Home/>} />
 <Route path='/sign-in' element={<SignIn/>} />
    <Route  path='/sign-out' element={<SignOut/>} />
    <Route  path='/profile' element={<Profile/>} />
    <Route  path='/about' element={<About/>} />
  </Routes>
  </BrowserRouter>
  
}

export default App