import {  Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import './App.css';
// import { useEffect, useState } from 'react';
import Register from './register';
import MainPage from './mainpage';
Axios.defaults.baseURL = "https://crudoperationsserver.onrender.com";
function App() {
  

  return (
    <div className="App">
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/register" element={<Register  />} />
          <Route path="/mainpage" element={<MainPage  />} />
        </Routes>
      
    </div>
  );
}

export default App;
