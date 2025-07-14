import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import GenerateCartIdIfNull from "./custom-hooks/GenerateCartIdIfNull";
import useCartUtilities from "./utilities/fetchUtilities";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import { useEffect } from "react";

function App() {
  const { getCartItems } = useCartUtilities();

  useEffect(() => {
    GenerateCartIdIfNull();

    async function fetchItems() {
      await getCartItems();
    }

    fetchItems();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
