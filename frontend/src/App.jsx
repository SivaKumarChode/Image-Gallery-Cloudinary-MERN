import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllFiles from './Components/AllFiles'
import FileDetails from './Components/FileDetails'
import {ToastContainer} from "react-toastify"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<AllFiles/>}/>
        <Route path='/:id' element={<FileDetails/>} />
      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App