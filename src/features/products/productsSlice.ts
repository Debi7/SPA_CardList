import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  liked: boolean;
}

interface ProductsState {
  initialItems: Product[];
  items: Product[];
}

const loadProducts = (): Product[] => {
  const savedProducts = localStorage.getItem('products');
  return savedProducts ? JSON.parse(savedProducts) : [];
};

const initialState: ProductsState = {
  initialItems: loadProducts(),
  items: loadProducts(),
};

const saveProducts = (items: Product[]) => {
  localStorage.setItem('products', JSON.stringify(items));
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.initialItems = action.payload;
      state.items = action.payload;
      saveProducts(state.items);
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        product.liked = !product.liked;
        saveProducts(state.items);
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveProducts(state.items);
    },
    restoreAllProducts: (state) => {
      state.items = state.initialItems;
      saveProducts(state.items);
    },
  },
});

export const { setProducts, toggleLike, deleteProduct, restoreAllProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
