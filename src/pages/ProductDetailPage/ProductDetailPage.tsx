import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Button from '../../components/Button';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) =>
    state.products.items.find(item => item.id === Number(id))
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="product-detail-container">
        <img src={product.image} alt={product.title} />
        {/* блок с текстом и кнопкой */}
        <div className='product-detail-text'>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <Button onClick={() => navigate('/')}>Back to Products</Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
