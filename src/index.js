import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RestaurantDetail from './RestaurantDetail/RestaurantDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar />
    <Sidebar/>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
{/* <BrowserRouter>
      <UserProvider>
        <Navbar loginEmail={loginEmail}  />
        <Routes>
          <Route path='/orderdata' element={<Orderdata/>}></Route>
          <Route path='/' element={<Home />} />
          <Route
          path='/product/:productId'
          element={<ProductDetail  />}
        />
          <Route path='/customerdetail' element={<Customerdetail />}></Route>
          <Route path='/Cart' element={<Cart />}></Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login setLoginEmail={setLoginEmail} />} />
        </Routes>
      </UserProvider>
    </BrowserRouter> */}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
