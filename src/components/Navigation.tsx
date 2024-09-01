import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className='nav'>
      <Link to="/" className="no-underline">All Products</Link>
      <Link to="/favorites" className="no-underline">Favorites</Link>
      <Link to="/create-product" className="no-underline">Create Product</Link>
    </nav>
  );
};

export default Navigation;
