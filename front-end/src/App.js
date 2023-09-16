import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './component/nav';
import Footer from './component/Footer'
import SignUp from './component/SignUp';
import PrivateRoute from './component/privatroute';
import Login from './component/login';
import AddProduct from './component/AddProduct';
import ProductList from './component/Productlist';
import UpdateProduct from './component/UpdateProduct';

function Home() {
  return <h1>Home</h1>;
}

function Product() {
  return <h1>Product</h1>;
}

function Profile() {
  return <h1>Profile</h1>;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
        <Route element={<PrivateRoute />} >
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/list" element={<ProductList />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

        </Routes>
        
      </Router>
      <Footer />     
    </div>
  );
}

export default App;
