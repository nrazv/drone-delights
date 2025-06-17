import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import LocalStorageManager from "./state/LocalStorageManager";
import { useContext, useEffect } from "react";
import GenerateCartIdIfNull from "./custom-hooks/GenerateCartIdIfNull";
import AppContext from "./state/AppContext";

function App() {
  const { shoppingCartId, setShoppingCartId } = useContext(AppContext);
  const localStorageManager = new LocalStorageManager("cartId");

  const setCartId = () => {
    GenerateCartIdIfNull();
    const cartId = localStorageManager.getItem();
    setShoppingCartId(cartId);
  };

  const getShoppingCartItems = () => {
    const apiUrl = `http://localhost:3004/shoppingCarts?cartId=${shoppingCartId}`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {})
      .catch((err) => {});
  };

  useEffect(() => {
    setCartId();
    getShoppingCartItems();
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
