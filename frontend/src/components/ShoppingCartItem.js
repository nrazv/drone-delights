import React from "react";
import { Box, Typography } from "@mui/material";
import ProductControl from "./ProductControl";
function ShoppingCartItem({ product }) {
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
        src={product.image}
        style={{ width: 60, height: 60 }}
      />
      <Typography textAlign={"center"} variant="subtitle2">
        {product.name}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle2">
        {product.price} $
      </Typography>
      <ProductControl product={product} />
    </Box>
  );
}

export default ShoppingCartItem;
