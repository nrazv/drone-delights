import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import FilterListIcon from "@mui/icons-material/FilterList";
import Menu from "@mui/material/Menu";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

const categories = Object.freeze({
  BURGERS: "Burgers",
  MAINS: "Mains",
  DESSERT: "Dessert",
  DRINKS: "Drinks",
  SIDES: "Sides",
});

function SearchAndFilter({ handelSearch }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box mb={4} mt={4} display={"flex"} justifyContent={"center"}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}
        elevation={3}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          onChange={(e) => {
            handelSearch(e);
          }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <IconButton
        size="large"
        type="button"
        id="filter-button"
        sx={{ marginLeft: "40px" }}
        onClick={handleClick}
      >
        <FilterListIcon fontSize="large" />
      </IconButton>
      <Menu
        id="filter-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        variant="menu"
      >
        <MenuItem
          disableRipple
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
              cursor: "default",
            },
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Pick Your Craving
          </Typography>
        </MenuItem>
        {Object.entries(categories).map(([key, value]) => (
          <MenuItem disableRipple key={key} divider>
            <FormControlLabel control={<Checkbox />} label={value} />
          </MenuItem>
        ))}

        <Button
          sx={{
            width: "200px",
            margin: "15px 5px 0px 5px",
            textTransform: "none",
          }}
          variant="contained"
          disableElevation
        >
          <Typography variant="subtitle1" fontWeight="200">
            Show products
          </Typography>
        </Button>
      </Menu>
    </Box>
  );
}

export default SearchAndFilter;
