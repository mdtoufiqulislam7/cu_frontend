
import React from 'react'
import HomePage from './component/homePage';
import From from './component/from';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/from' element={<From/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App