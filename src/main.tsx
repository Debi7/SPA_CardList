import ReactDOM from 'react-dom/client';
import { StrictMode } from "react";
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/index';
import './style.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);