import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { RootState } from '../store'; // Импортируйте корневой тип состояния из Redux хранилища

const ProductList: React.FC = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const products = useSelector((state: RootState) => state.products.items); // Получение списка продуктов из хранилища

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const filteredProducts = showFavorites
    ? products.filter(product => product.liked)
    : products;

  return (
    <div>
      <button onClick={handleToggleFavorites}>
        {showFavorites ? 'Show All' : 'Show Favorites'}
      </button>
      <div className="product-list">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onClick={() => { }} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
