import React from 'react'
import Login from './Login/Login'
import Register from './Register/Register'
import Header from '../../common/header/Header'
// import Footer from '../../common/footer/Footer'

const Index = () => {
  return (
    <>
      <Header />
      <div className='auth__index'>
        <Login/>
        <Register/>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Index