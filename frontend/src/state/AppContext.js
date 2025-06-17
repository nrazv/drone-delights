import { createContext, useState } from "react";

const AppContext = createContext([]);
export default AppContext;

export function AppContextProvider(props) {
  const [shoppingCartId, setShoppingCartId] = useState();

  return (
    <AppContext.Provider
      value={{
        shoppingCartId,
        setShoppingCartId,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
