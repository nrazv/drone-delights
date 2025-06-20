import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartItem from "./ShoppingCartItem";
import { useNavigate } from "react-router-dom";
import { Button, colors } from "@mui/material";
import Badge from "@mui/material/Badge";
import AppContext from "../state/AppContext";
import { NavLink } from "react-router";

const ITEM_HEIGHT = 80;

function Navbar() {
  const { cartItems } = React.useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/checkout");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navLinkStyles = ({ isActive }) => {
    return {
      textDecoration: isActive ? "underline overline 2px" : "none",
      color: "white",
    };
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#FFA07A" }}>
        <Toolbar sx={{ ml: "auto" }}>
          <NavLink to="/" style={navLinkStyles}>
            <Typography
              variant="h6"
              fontWeight="bold"
              component="div"
              mx={3}
              color="black"
            >
              Home
            </Typography>
          </NavLink>
          <NavLink to="/menu" style={navLinkStyles}>
            <Typography
              variant="h6"
              fontWeight="bold"
              component="div"
              color="black"
              mx={3}
            >
              Menu
            </Typography>
          </NavLink>
          <IconButton aria-label="cart" onClick={handleClick}>
            <Badge badgeContent={cartItems && cartItems.length} color="primary">
              <ShoppingCartIcon sx={{ fill: "black", fontSize: 28 }} />
            </Badge>
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.7,
                },
              },
            }}
          >
            <div
              style={{
                maxHeight: "300px",
                overflow: "scroll",
                scrollbarGutter: "stable",
                overflowX: "hidden",
              }}
            >
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((p) => (
                  <MenuItem
                    disableRipple
                    key={p.id}
                    sx={{ justifyContent: "center" }}
                  >
                    <ShoppingCartItem product={p} />
                  </MenuItem>
                ))
              ) : (
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  component="div"
                  color="black"
                  mx={3}
                >
                  Nothing in the cart
                </Typography>
              )}
            </div>
            {cartItems ? (
              <MenuItem
                disabled={!cartItems.length > 0}
                disableRipple
                disableTouchRipple
                sx={{ justifyContent: "center" }}
              >
                <Button
                  size="small"
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={goToCheckout}
                >
                  Checkout
                </Button>
              </MenuItem>
            ) : (
              ""
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
