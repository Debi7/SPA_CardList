// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../../store';
// import { setProducts } from '../../features/products/productsSlice';
// import ProductCard from '../../components/ProductCard';
// import { useNavigate } from 'react-router-dom';

// const ProductsPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state: RootState) => state.products.items);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       if (products.length === 0) {
//         const response = await fetch('https://fakestoreapi.com/products');
//         const data = await response.json();
//         dispatch(setProducts(data));
//       }
//     };

//     fetchProducts();
//   }, [dispatch, products.length]);

//   return (
//     <div className='wrapper'>
//       <div className="products-page">
//         {products.map(product => (
//           <ProductCard
//             key={product.id}
//             product={product}
//             onClick={() => navigate(`/products/${product.id}`)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;


import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProducts } from '../../features/products/productsSlice';
import ProductCard from '../../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleProductClick = useCallback((productId: number) => {
    navigate(`/products/${productId}`);
  }, [navigate]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error fetching products: {error}</div>;
  }

  return (
    <div>
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
  );
};

export default ProductsPage;
