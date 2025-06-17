import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import LocalStorageManager from "./state/LocalStorageManager";
import { useContext, useEffect } from "react";
import GenerateCartIdIfNull from "./custom-hooks/GenerateCartIdIfNull";
import AppContext from "./state/AppContext";
import { getCartItems } from "./utilities/fetchUtilities";

const localStorageManager = new LocalStorageManager("cartId");

function App() {
  const { setShoppingCartId, setCartItems } = useContext(AppContext);

  const setCartId = () => {
    GenerateCartIdIfNull();
    const cartId = localStorageManager.getItem();
    setShoppingCartId(cartId);
  };

  useEffect(() => {
    async function fetchItems() {
      const data = await getCartItems();
      setCartItems([...data]);
    }
    fetchItems();
    setCartId();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
