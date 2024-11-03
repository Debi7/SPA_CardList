import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance } from '../../apiConfig';

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  liked: boolean;
}

interface ProductsState {
  initialItems: Product[];
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const STORAGE_KEY = 'products';

const loadProducts = (): Product[] => {
  const savedProducts = localStorage.getItem(STORAGE_KEY);
  return savedProducts ? JSON.parse(savedProducts) : [];
};

const saveProducts = (items: Product[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const initialState: ProductsState = {
  initialItems: loadProducts(),
  items: loadProducts(),
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchProducts',
  async () => {
    console.log(1);
    const data = await apiInstance.get<Product[]>('/products');
    return data;
  }
);

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
      state.items = [...state.initialItems];
      saveProducts(state.items);
    },
    clearAllProducts: (state) => {
      state.items = [];
      state.initialItems = [];
      localStorage.removeItem(STORAGE_KEY);
    },
    searchProducts: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.items = state.initialItems.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
    },

    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
      state.initialItems.push(action.payload);
      saveProducts(state.items);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = 'succeeded';
          state.items = action.payload;
          state.initialItems = action.payload;
          saveProducts(state.items);
        }
      );
  },
});

export const {
  setProducts,
  toggleLike,
  deleteProduct,
  restoreAllProducts,
  clearAllProducts,
  searchProducts,
  addProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
