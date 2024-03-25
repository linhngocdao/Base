import React from 'react'
import { Outlet } from 'react-router-dom'

const ClientLayuot:React.FC = () => {
  return (
    <>
      <div>
        <h1>Header</h1>
      </div>
      <Outlet />
      <div>
        <h1>Footer</h1>
      </div>
    </>
  )
}

export default ClientLayuot