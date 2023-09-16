import React, { useEffect } from "react";
import './addproduct.css'
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [company, setCompany] = React.useState('');
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProductDetails = async () => {
      let result = await fetch(`http://localhost:5000/product/${param.id}`,{
        headers: {
        
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
           
        }
      });    
      result = await result.json();
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setCompany(result.company);
    }

    getProductDetails(); // Call getProductDetails here

  }, [param.id]); // Include param.id as a dependency

  const updateProduct = async () => {
    console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${param.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        'Content-Type': "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
         
      }
    });
    result = await result.json();
    console.warn(result);
    navigate('/list');
  }

  return (
    <div className="container">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        className="inputBox"
        value={name}
        onChange={(e) => { setName(e.target.value) }}
      />
      <input
        type="text"
        placeholder="Enter Product Price"
        className="inputBox"
        value={price}
        onChange={(e) => { setPrice(e.target.value) }}
      />
      <input
        type="text"
        placeholder="Enter Product Category"
        className="inputBox"
        value={category}
        onChange={(e) => { setCategory(e.target.value) }}
      />
      <input
        type="text"
        placeholder="Enter Product Company"
        className="inputBox"
        value={company}
        onChange={(e) => { setCompany(e.target.value) }}
      />
      <button className="appButton" onClick={updateProduct}>Save</button>
    </div>
  );
}

export default UpdateProduct;
