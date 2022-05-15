import { createContext, useContext, useState } from 'react';

const ProductsContext = createContext();
const useProducts = () => useContext(ProductsContext);

const ProductsProvider = ({ value, children }) => {
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

export { ProductsProvider, useProducts };
