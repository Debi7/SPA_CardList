import React, { useEffect, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAndStoreProducts } from '../../features/products/productsSlice';
import ProductCard from '../../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination';


const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // количество товаров на странице

  useEffect(() => {
    dispatch(fetchAndStoreProducts());
  }, [dispatch]);

  const handleProductClick = useCallback((productId: number) => {
    navigate(`products/${productId}`);
  },
    [navigate]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (status === 'failed') {
    return <div>Error fetching products: {error}</div>;
  }


  return (
    <div className="product-list-home">
      <div className="product-list">
        {Array.isArray(currentProducts) && currentProducts.length > 0 ? (
          currentProducts.map((product) => (
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

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(products.length / itemsPerPage)}
        onPageChange={handlePageChange}
        onPrev={() => handlePageChange(Math.max(currentPage - 1, 1))}
        onNext={() => handlePageChange(Math.min(currentPage + 1, Math.ceil(products.length / itemsPerPage)))}
      />
    </div>
  );
};

export default ProductsPage;
