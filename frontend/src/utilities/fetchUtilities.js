import AppContext from "../state/AppContext";
import React from "react";
import LocalStorageManager from "../state/LocalStorageManager";

const API_URL = "http://localhost:3004/shoppingCarts";
const localStorageManager = new LocalStorageManager("cartId");

export default function useCartUtilities() {
  const { setCartItems, shoppingCartId, setShoppingCartId } =
    React.useContext(AppContext);

  const removeProductFromCart = async (id) => {
    const cart = await getShoppingCart();
    cart.products = cart.products.filter((p) => p.id != id);
    await updateShoppingCart(cart);
  };

  const getCartItems = async () => {
    const data = await getShoppingCart();
    if (data) {
      setCartItems(data.products);
    } else {
      setCartItems([]);
    }
  };

  const decreaseQuantity = async (product) => {
    const quantity = product.quantity - 1;
    if (quantity === 0) {
      await removeProductFromCart(product.id);
      return;
    }
    const cart = await getShoppingCart();
    const productInCart = cart.products.find((e) => e.id === product.id);

    if (productInCart) {
      productInCart.quantity = productInCart.quantity - 1;
      await updateShoppingCart(cart);
    }
  };

  const increaseQuantity = async (product) => {
    const cart = await getShoppingCart();
    const productInCart = cart.products.find((e) => e.id === product.id);

    if (productInCart) {
      productInCart.quantity = productInCart.quantity + 1;
      await updateShoppingCart(cart);
    }
  };

  const addProduct = async (product) => {
    const cart = await getShoppingCart();

    if (cart && cart.id) {
      const productInCart = cart.products.find((e) => e.id === product.id);

      if (productInCart) {
        await increaseQuantity(product);
      } else {
        cart.products.push({ ...product, quantity: 1 });
        await updateShoppingCart(cart);
      }
    } else {
      await createShoppingCart({
        id: shoppingCartId,
        products: [{ ...product, quantity: 1 }],
      });
    }
  };

  const getShoppingCart = async () => {
    const cartId = localStorageManager.getItem();
    setShoppingCartId(cartId);
    try {
      const URL = `${API_URL}/${cartId}`;
      const response = await fetch(URL, {
        headers: { Accept: "application/json" },
      });

      return await response.json();
    } catch (err) {}
  };

  const updateShoppingCart = async (cart) => {
    await fetch(`${API_URL}/${shoppingCartId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
    }).then(async () => {
      await getCartItems();
    });
  };

  const createShoppingCart = async (shoppingCart) => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shoppingCart),
    }).then(async () => {
      await getCartItems();
    });
  };

  const updateQuantity = async (product, quantity) => {
    const cart = await getShoppingCart();
    let p = cart.products.find((e) => e.id === product.id);
    p.quantity = quantity;

    await updateShoppingCart(cart);
  };

  return {
    addProduct,
    getCartItems,
    decreaseQuantity,
    increaseQuantity,
    removeProductFromCart,
    updateQuantity,
  };
}
