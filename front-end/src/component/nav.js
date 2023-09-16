import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css'; // Import the CSS file

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate(); // Corrected useNavigate
    const logout = () => {
        localStorage.clear();
        navigate('/');
    }
    return (
        <div>
            { auth ?<ul className='nav-ul'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/product'>Product</Link></li>
                <li><Link to='/add'>Add Product</Link></li>
                <li><Link to='/list'>List Product</Link></li>
               <li><Link to='/profile'>Profile</Link></li>
                <li><Link onClick={logout} to='/logout'>Logout ({JSON.parse(auth).name})</Link> </li>
                
            </ul>: <ul className='nav-ul nav-right'>
            <li><Link to='/login'>Login</Link></li>
           <li> <Link to='/signup'>SignUp</Link> </li>
            </ul>}
        </div>
    );
}

export default Nav;
