const apiUrl = "http://localhost:3004/shoppingCarts";

export const getCartProductById = async (product) => {
  try {
    const URL = `${apiUrl}/${product.id}`;
    const response = await fetch(URL, {
      headers: { Accept: "application/json" },
    });
    return await response.json();
  } catch (err) {}
};

export const updateQuantity = async (product) => {
  await fetch(`${apiUrl}/${product.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: product.quantity + 1 }),
  });
};
