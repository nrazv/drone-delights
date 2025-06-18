import AppContext from "../state/AppContext";
import React from "react";
import LocalStorageManager from "../state/LocalStorageManager";

const apiUrl = "http://localhost:3004/shoppingCarts";
const localStorageManager = new LocalStorageManager("cartId");

export default function useCartUtilities() {
  const { setCartItems, shoppingCartId } = React.useContext(AppContext);

  const getCartProductById = async (product) => {
    try {
      const URL = `${apiUrl}/${product.id}`;
      const response = await fetch(URL, {
        headers: { Accept: "application/json" },
      });
      return await response.json();
    } catch (err) {}
  };

  const removeProductFromCart = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3004/shoppingCarts/${id}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateQuantity = async (product, quantity) => {
    await fetch(`${apiUrl}/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: quantity }),
    });
  };

  const getCartItems = async () => {
    const cartId = localStorageManager.getItem();
    try {
      const URL = `${apiUrl}?cartId=${cartId}`;
      const response = await fetch(URL, {
        headers: { Accept: "application/json" },
      });
      const data = await response.json();
      setCartItems(data);
    } catch (err) {}
  };

  const increaseQuantity = async (product) => {
    console.log(product);

    const quantity = product.quantity + 1;
    await updateQuantity(product, quantity);
    await getCartItems();
  };

  const decreaseQuantity = async (product) => {
    const quantity = product.quantity - 1;

    if (quantity === 0) {
      await removeProductFromCart(product.id);
      await getCartItems();
      return;
    }

    await updateQuantity(product, quantity);
    await getCartItems();
  };

  const addProduct = async (product) => {
    const productInCart = await getCartProductById(product);

    if (productInCart.id === product.id) {
      const quantity = productInCart.quantity + 1;
      await updateQuantity(productInCart, quantity);
      await getCartItems();
      return;
    }

    const cartItem = {
      ...product,
      cartId: shoppingCartId,
      quantity: 1,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    }).then(async () => {
      await getCartItems();
    });
  };
  return { addProduct, getCartItems, decreaseQuantity, increaseQuantity };
}
