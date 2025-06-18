import React from "react";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import "./ProductMenu.css";
import Button from "@mui/material/Button";
import useCartUtilities from "../utilities/fetchUtilities";

function MenuProduct({ product }) {
  const { addProduct } = useCartUtilities();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
          onClick={() => {
            addProduct(product);
            handleClick();
          }}
        >
          Add to cart
        </Button>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {product.name} added to cart !
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default MenuProduct;
