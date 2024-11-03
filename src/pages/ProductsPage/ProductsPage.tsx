import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAndStoreProducts } from '../../features/products/productsSlice';
import ProductCard from '../../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAndStoreProducts());
  }, [dispatch]);

  const handleProductClick = useCallback((productId: number) => {
    navigate(`/products/${productId}`);
  }, [navigate]);

  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  if (status === 'failed') {
    return <div>Error fetching products: {error}</div>;
  }

  return (
    <div className="product-list-home">
      <div className="product-list">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product.id)}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;