import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setProducts } from '../../features/products/productsSlice';
import ProductCard from '../../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      dispatch(setProducts(data));
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className='wrapper'>
      <Navigation />
      <div className="products-page">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/products/${product.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
