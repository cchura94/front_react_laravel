import React from 'react'
import { Outlet } from 'react-router-dom';

const SitioLayout = () => {
  return (
    <>
    <h1>SitioLayout</h1>
    <Outlet />
    </>
  )
}

export default SitioLayout;