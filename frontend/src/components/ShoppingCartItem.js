import React from "react";
import { Box, Typography } from "@mui/material";
import ProductControl from "./ProductControl";
function ShoppingCartItem({ name, price, image, quantity, id }) {
  return (
    <Box
      borderRadius={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        className="product-image"
        src={image}
        style={{ width: 60, height: 60 }}
      />
      <Typography textAlign={"center"} variant="subtitle2">
        {name}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle2">
        {price} $
      </Typography>
      <ProductControl quantity={quantity} id={id} />
    </Box>
  );
}

export default ShoppingCartItem;
