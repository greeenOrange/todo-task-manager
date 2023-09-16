import React from 'react'
import NavBar from '../Shared/NavBar/NavBar'
import { Outlet } from 'react-router-dom';
import './App.css'

const Root = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default Root