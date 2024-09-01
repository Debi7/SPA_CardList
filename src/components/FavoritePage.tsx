import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { RootState } from '../store'; // Импортируйте корневой тип состояния из Redux хранилища

const FavoritePage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items); // Получение списка продуктов из хранилища
  const favoriteProducts = products.filter(product => product.liked);
  const navigate = useNavigate();

  return (
    <div className="product-list-favorites">
      <h1>Favorites</h1>
      <div className="product-list">
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={() => { }} />
          ))
        ) : (
          <p>No favorite products yet.</p>
        )}
      </div>

      <button onClick={() => navigate('/')}>Back to Products</button>

    </div>
  );
};

export default FavoritePage;
