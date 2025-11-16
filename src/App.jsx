
import React from 'react'
import HomePage from './component/homePage';
import From from './component/from';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './component/Admin';
import Approved from './component/Approved';
import UploadImage from './component/uploadimage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/from' element={<From/>} />
          <Route path='/admin-mahi' element={<Admin/>} />
          <Route path='/approved' element={<Approved/>} />
          <Route path='/uploadimage' element={<UploadImage/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App