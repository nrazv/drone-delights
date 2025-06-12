import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import FilterListIcon from "@mui/icons-material/FilterList";

function SearchAndFilter({ handelSearch }) {
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
      <IconButton size="large" type="button" sx={{ marginLeft: "40px" }}>
        <FilterListIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}

export default SearchAndFilter;
