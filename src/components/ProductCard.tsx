import React from 'react';
// import { useDispatch } from 'react-redux';
import { toggleLike, deleteProduct } from '../features/products/productsSlice';
import { Product } from '../types/ProductTypes';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrash } from 'react-icons/fa';
import dispatch from '../pages/ProductsPage/ProductsPage';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  // const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(toggleLike(product.id));
  };

  const handleDelete = () => {
    dispatch(deleteProduct(product.id));
  };

  return (
    <div className="product-card-container">
      <Link to={`/products/${product.id}`} className="product-card-link">
        <div className="product-card" onClick={onClick}>
          <img className="product-img" src={product.image} alt={product.title} />
          <div className="product-content">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
          </div>
        </div>
      </Link>
      <div className="product-card-actions">
        <Button onClick={handleLike} className="like-button">
          {product.liked ? <FaHeart color="#ff0000" /> : <FaHeart color="#000000" />}
        </Button>
        <Button onClick={handleDelete} className="delete-button">
          <FaTrash color="#000000" />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
