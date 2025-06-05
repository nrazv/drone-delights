import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function ProductControl() {
  const [amount, setAmount] = useState(1);

  return (
    <ButtonGroup size="small" variant="contained">
      <Button>-</Button>
      <Button disabled>{amount}</Button>
      <Button>+</Button>
    </ButtonGroup>
  );
}

export default ProductControl;
