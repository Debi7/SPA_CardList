import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage/CreateProductPage';
import FavoritePage from './components/FavoritePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Главная страница со списком продуктов */}
        <Route path="/" element={<ProductsPage />} />

        {/* Страница избранных продуктов */}
        <Route path="/favorites" element={<FavoritePage />} />

        {/* Детальная страница продукта */}
        <Route path="/products/:id" element={<ProductDetailPage />} />

        {/* Страница для создания нового продукта */}
        <Route path="/create-product" element={<CreateProductPage />} />
      </Routes>
    </Router>
  );
};

export default App;
