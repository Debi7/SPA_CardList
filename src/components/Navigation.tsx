import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchProducts } from '../features/products/productsSlice';
import { IoIosSearch } from "react-icons/io";
import Button from './Button';


const Navigation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchProducts(searchTerm));
  };


  return (
    <>
      <nav className='nav'>
        <Link to="/" className="nav-link">All Products</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
        <Link to="/create-product" className="nav-link">Create Product</Link>
        <div className='wrapper-search'>
          <input type="text" placeholder='Search' className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <Button
            onClick={handleSearch}
            className="search-button">
            <IoIosSearch color="#000000" />
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
