import React from "react";
import { Box, Typography } from "@mui/material";
import "./ProductMenu.css";
import Button from "@mui/material/Button";
import {
  getCartItems,
  getCartProductById,
  updateQuantity,
} from "../utilities/fetchUtilities";
import AppContext from "../state/AppContext";

function MenuProduct({ product }) {
  const { shoppingCartId, setCartItems } = React.useContext(AppContext);
  const apiUrl = "http://localhost:3004/shoppingCarts";

  const addProduct = async (product) => {
    const productInCart = await getCartProductById(product);

    if (productInCart.id === product.id) {
      await updateQuantity(productInCart);
      const data = await getCartItems();
      setCartItems([...data]);
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
      const data = await getCartItems();
      setCartItems([...data]);
    });
  };

  return (
    <Box
      margin={2}
      width={240}
      height={326}
      borderRadius={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        border: "solid 3px gray",
      }}
    >
      <img className="product-image" alt={product.name} src={product.image} />
      <Typography variant="subtitle2" mt={1}>
        {product.name} - {product.price} $
      </Typography>
      <div style={{ marginTop: "10px" }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => addProduct(product)}
        >
          Add to cart
        </Button>
      </div>
    </Box>
  );
}

export default MenuProduct;
