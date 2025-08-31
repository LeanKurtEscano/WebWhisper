import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import Generate from './sections/Generate';

function App() {

  return (
    <>
    <Main/>
    
    
    </>
      
  );
}
const Main: React.FC = () => {


  return (
    <>
    <Routes> 
      <Route path="/" element={<Generate />} />
    </Routes>
      
    </>
  )
}

export default App
