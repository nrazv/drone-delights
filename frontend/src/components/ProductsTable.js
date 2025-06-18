import React from "react";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  Typography,
} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import AppContext from "../state/AppContext";
import DeleteIcon from "@mui/icons-material/Delete";

function ProductsTable() {
  const { cartItems } = React.useContext(AppContext);
  const onQtyChange = (id, item) => {
    console.log(id, item);
  };
  const columns = [
    { dataKey: "product", label: "Product", width: 200, align: "center" },
    {
      dataKey: "price",
      label: "Price",
      width: 50,
      align: "center",
    },
    {
      dataKey: "quantity",
      label: "Quantity",
      width: 150,
      align: "center",
    },
    {
      dataKey: "subtotal",
      label: "Subtotal",
      width: 80,
      align: "center",
    },
    {
      dataKey: "delete",
      label: "",
      width: 30,
      align: "left",
    },
  ];

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 550 }} elevation={0}>
      <Table aria-label="products checkout table" stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((c) => (
              <TableCell width={c.width} align={c.align} key={c.label}>
                {c.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <img
                    src={item.image}
                    alt={item.name}
                    width={48}
                    height={48}
                    style={{ objectFit: "cover", borderRadius: 4 }}
                  />
                  <Typography variant="body2">{item.name}</Typography>
                </Box>
              </TableCell>

              <TableCell align="center">${item.price.toFixed(2)}</TableCell>

              <TableCell align="center">
                <TextField
                  type="number"
                  size="small"
                  value={item.quantity}
                  sx={{ width: 80 }}
                  onChange={(e) => onQtyChange(item, +e.target.value)}
                />
              </TableCell>

              <TableCell align="center">
                ${(item.price * item.quantity).toFixed(2)}
              </TableCell>

              <TableCell align="center">
                <IconButton size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductsTable;
