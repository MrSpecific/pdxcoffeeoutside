import { createContext, useContext, useState } from 'react';

const CatalogContext = createContext();
const useCatalog = () => useContext(CatalogContext);

const CatalogProvider = ({ value, children }) => {
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
};

export { CatalogProvider, useCatalog };
