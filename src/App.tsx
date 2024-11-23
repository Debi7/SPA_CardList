import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage/CreateProductPage';
import FavoritePage from './components/FavoritePage';
import Navigation from './components/Navigation';

const App: React.FC = () => {

  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/SPA_CardList/" element={<ProductsPage />} />
          <Route path="/SPA_CardList/favorites" element={<FavoritePage />} />
          <Route path="/SPA_CardList/create-product" element={<CreateProductPage />} />
          <Route path="/SPA_CardList/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;