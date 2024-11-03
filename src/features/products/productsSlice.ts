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

const loadStoredProducts = (): Product[] => {
  const savedProducts = localStorage.getItem(STORAGE_KEY);
  return savedProducts ? JSON.parse(savedProducts) : [];
};

const saveProducts = (items: Product[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const initialState: ProductsState = {
  initialItems: loadStoredProducts(),
  items: loadStoredProducts(),
  status: 'idle',
  error: null,
};

export const fetchAndStoreProducts = createAsyncThunk<Product[], void>(
  'products/fetchAndStoreProducts',
  async () => {
    const storedProducts = loadStoredProducts();

    if (storedProducts.length > 0) {
      return storedProducts;
    }

    const data = await apiInstance.get<Product[]>('/products');
    saveProducts(data);
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
      .addCase(fetchAndStoreProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchAndStoreProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = 'succeeded';
          state.items = action.payload;
          state.initialItems = action.payload;
        }
      )
      .addCase(fetchAndStoreProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load products';
      });
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
