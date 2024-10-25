import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { RootState } from '../store';

const FavoritePage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const favoriteProducts = products.filter(product => product.liked);

  return (
    <div className="product-list-favorites">
      <div className="product-list">
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map(product => (
            <ProductCard className={'product-card-favorites'} key={product.id} product={product} onClick={() => { }} />
          ))
        ) : (
          <p>No favorite products yet</p>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;
