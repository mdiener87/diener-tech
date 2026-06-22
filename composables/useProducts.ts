import { productsData } from "~/utils/productsData";

export type ProductEntry = (typeof productsData)[number];

export const useProducts = () => {
  const products = productsData;

  return {
    products,
    featuredProducts: products,
    getProductById: (id: string) =>
      products.find((product) => product.id === id),
  };
};
