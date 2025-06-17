import { createContext, useState } from "react";

const ProductsContext = createContext([]);
export default ProductsContext;

export function ProductsProvider(props) {
  const [shoppingCartId, setShoppingCartId] = useState();

  return (
    <ProductsContext.Provider
      value={{
        shoppingCartId,
        setShoppingCartId,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
}
