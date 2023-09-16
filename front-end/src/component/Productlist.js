import React, { useEffect, useState } from "react";
import './productlist.css'
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const DeleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/productdel/${id}`, {
        method: 'DELETE',
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      const result = await response.json();
      if (result) {
        alert("Data Deleted Successfully");
        // Refresh the product list after deletion
        fetchProducts();
      }
    } catch (error) {
      console.error('Error while deleting product:', error);
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products',{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error while fetching products:', error);
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      try {
        const response = await fetch(`http://localhost:5000/search/${key}`,{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        if (response.ok) {
          const result = await response.json();
          setProducts(result);
        } else {
          console.error('Failed to search for products');
        }
      } catch (error) {
        console.error('Error while searching for products:', error);
      }
    } else {
      // Clear the search results and show all products
      fetchProducts();
    }
  }

  return (
    <div className="productlist">
      <h1>Product List</h1>
      <input type="text" onChange={searchHandle} 
      placeholder="Search" className="search-input" />

      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {products.length>0?
      products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
            <button onClick={() => DeleteItem(item._id)}>Delete</button>
            <Link to={"/update/" + item._id}>Update</Link>
          </li>
        </ul>
      )):(<h1>User Not Found</h1>)}
    </div>
  );
};

export default ProductList;
