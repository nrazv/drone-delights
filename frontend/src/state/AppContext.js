import { createContext, useState } from "react";

const AppContext = createContext([]);
export default AppContext;

export function AppContextProvider(props) {
  const [shoppingCartId, setShoppingCartId] = useState();
  const [cartItems, setCartItems] = useState([]);

  return (
    <AppContext.Provider
      value={{
        shoppingCartId,
        setShoppingCartId,
        cartItems,
        setCartItems,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
