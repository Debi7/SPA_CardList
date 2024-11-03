// import { Product } from '../features/products/productsSlice';

// export const STORAGE_KEY = 'products';

// export const saveProducts = (products: Product[]) => {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
// };

// export const loadStoredProducts = (
//   productsFromApi: Product[] = []
// ): Product[] => {
//   const savedProducts = localStorage.getItem(STORAGE_KEY);
//   const storedProducts = savedProducts ? JSON.parse(savedProducts) : [];

//   const uniqueProducts = productsFromApi.concat(
//     storedProducts.filter(
//       (storedProduct: Product) =>
//         !productsFromApi.some(
//           (apiProduct) => apiProduct.id === storedProduct.id
//         )
//     )
//   );

//   return uniqueProducts;
// };
