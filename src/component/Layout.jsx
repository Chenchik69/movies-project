import React from 'react'

import Header from "./Header"

import { Container } from "@mui/system";

import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
      <Header/>
      {/* <Container maxWidth='lg'> */}
        <main>
            <Outlet/>
        </main>
      {/* </Container> */}
    </>
  )
}

export default Layout