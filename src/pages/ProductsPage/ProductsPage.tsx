import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProducts } from '../../features/products/productsSlice';
import ProductCard from '../../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { setProducts, Product } from '../../features/products/productsSlice';


const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    } else if (status === 'succeeded') {
      const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');

      if (storedProducts.length > 0) {
        const filteredStoredProducts = storedProducts.filter(
          (storedProduct: Product) => !products.some(product => product.id === storedProduct.id)
        );
        const combinedProducts = [...products, ...filteredStoredProducts];
        dispatch(setProducts(combinedProducts));
      }
    }
  }, [dispatch, status]);


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

// TODO в localStorage должен сохраняться вновь созданный товар, чтобы при перезагрузке страницы этот товар отображался в конце списка товаров из API
// и лайки на товаре при перезагрузке страницы тоже должны сохраняться, если на товаре поставлен лайк (это касается изначальных товаров и вновь созданных)
