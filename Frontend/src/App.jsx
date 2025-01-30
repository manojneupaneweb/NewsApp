import { useState } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import { Outlet } from "react-router"


function App() {

  return (
    <>
    <Header />
    <Outlet />
    <Footer />

    </>
  )
}

export default App
