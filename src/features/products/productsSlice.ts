import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  liked: boolean;
}

interface ProductsState {
  items: Product[];
}

const loadProductsFromLocalStorage = (): Product[] => {
  const savedProducts = localStorage.getItem('products');
  return savedProducts ? JSON.parse(savedProducts) : [];
};

const initialState: ProductsState = {
  items: loadProductsFromLocalStorage(),
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      localStorage.setItem('products', JSON.stringify(state.items));
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        product.liked = !product.liked;
        localStorage.setItem('products', JSON.stringify(state.items));
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem('products', JSON.stringify(state.items));
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
      localStorage.setItem('products', JSON.stringify(state.items));
    },
  },
});

export const { setProducts, toggleLike, deleteProduct, addProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
