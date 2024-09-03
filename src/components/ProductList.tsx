// этот файл про фильтрацию и показ всех товаров или избранных товаров
// тогда не надо использовать переключение между страницами главной и избранное

// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import ProductCard from './ProductCard';
// import { RootState } from '../store';

// const ProductList: React.FC = () => {
//   const [showFavorites, setShowFavorites] = useState(false);
//   const products = useSelector((state: RootState) => state.products.items);

//   const handleToggleFavorites = () => {
//     setShowFavorites(!showFavorites);
//   };

//   const filteredProducts = showFavorites
//     ? products.filter(product => product.liked)
//     : products;

//   return (
//     <div>
//       <button onClick={handleToggleFavorites}>
//         {showFavorites ? 'Show All' : 'Show Favorites'}
//       </button>
//       <div className="product-list">
//         {filteredProducts.map(product => (
//           <ProductCard key={product.id} product={product} onClick={() => { }} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;
