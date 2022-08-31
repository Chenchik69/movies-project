import React from 'react'

import Header from "./Header"

import { Outlet } from "react-router-dom"
import { Paper, Container } from '@mui/material';

const Layout = () => {
  return (
    <>
      <Paper sx={{height:'100%'}}>
        <Header/>
        <Container maxWidth='xl'>
          <main>
              <Outlet/>
          </main>
        </Container>
      </Paper>
    </>
  )
}

export default Layout