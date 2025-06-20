import { useContext, useState } from "react";
import AppContext from "../state/AppContext";
import GenerateCartIdIfNull from "./GenerateCartIdIfNull";

const apiUrl = "http://localhost:3004/orders";

export default function usePlaceOrder() {
  const {
    cartItems,
    setCartItems,
    setShoppingCartId,
    shippingAddress,
    setShippingAddress,
  } = useContext(AppContext);

  const placeOrder = () => {
    const order = {
      id: eightDigitId(),
      products: [...cartItems],
      address: shippingAddress,
      status: "On the way",
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }).then(async () => {
      localStorage.clear();
      GenerateCartIdIfNull();
      setCartItems([]);
      setShoppingCartId(localStorage.getItem("cartId"));
      setShippingAddress({});
    });
  };

  function eightDigitId() {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return String(arr[0] % 1e8).padStart(8, "0");
  }

  return { placeOrder };
}
