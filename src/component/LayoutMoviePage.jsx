import React from 'react'

import { Outlet } from "react-router-dom"

const LayoutMoviePage = () => {
  return (
    <>
        <main>
            <Outlet/>
        </main>
    </>
  )
}

export default LayoutMoviePage