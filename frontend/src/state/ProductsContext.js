import { createContext, useState } from "react";

const ProductsContext = createContext([]);
export default ProductsContext;

export function ProductsProvider(props) {
  const [products, setProducts] = useState([]);

  const addProduct = (product) =>
    setProducts((products) => {
      return [product, ...products];
    });

  const removeProduct = (product) =>
    setProducts((products) => {
      return products.filter((p) => p.id !== product.id);
    });

  return (
    <ProductsContext.Provider value={{ products, addProduct, removeProduct }}>
      {props.children}
    </ProductsContext.Provider>
  );
}
