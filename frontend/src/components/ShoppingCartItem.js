import React from "react";
import { Box, Typography } from "@mui/material";
import ProductControl from "./ProductControl";
function ShoppingCartItem({ name, brand, price, calories, image }) {
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
      <ProductControl />
    </Box>
  );
}

export default ShoppingCartItem;
