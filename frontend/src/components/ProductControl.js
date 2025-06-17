import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AppContext from "../state/AppContext";
import {
  getCartItems,
  removeProductFromCart,
  updateQuantity,
} from "../utilities/fetchUtilities";

function ProductControl({ product }) {
  const { setCartItems } = React.useContext(AppContext);

  const increaseQuantity = async () => {
    const quantity = product.quantity + 1;
    await updateQuantity(product, quantity);
    const data = await getCartItems();
    setCartItems([...data]);
  };

  const decreaseQuantity = async () => {
    const quantity = product.quantity - 1;
    if (quantity === 0) {
      removeProductFromCart(product.id);
      const data = await getCartItems();
      setCartItems([...data]);
      return;
    }

    await updateQuantity(product, quantity);
    const data = await getCartItems();
    setCartItems([...data]);
  };

  return (
    <ButtonGroup size="small" variant="contained">
      <Button onClick={() => decreaseQuantity()}>-</Button>
      <Button
        sx={{
          "&.Mui-disabled": {
            color: "grey.800",
            backgroundColor: "white",
          },
        }}
        disabled
      >
        {product.quantity}
      </Button>
      <Button onClick={() => increaseQuantity()}>+</Button>
    </ButtonGroup>
  );
}

export default ProductControl;
