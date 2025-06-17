import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AppContext from "../state/AppContext";

function ProductControl({ quantity, id }) {
  const { increaseQuantity } = React.useContext(AppContext);

  return (
    <ButtonGroup size="small" variant="contained">
      <Button>-</Button>
      <Button
        sx={{
          "&.Mui-disabled": {
            color: "grey.800",
            backgroundColor: "white",
          },
        }}
        disabled
      >
        {quantity}
      </Button>
      <Button onClick={() => increaseQuantity(id)}>+</Button>
    </ButtonGroup>
  );
}

export default ProductControl;
