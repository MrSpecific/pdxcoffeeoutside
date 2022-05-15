import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();
const useProduct = () => useContext(ProductContext);

const ProductProvider = ({ value, children }) => {
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export { ProductProvider, useProduct };
