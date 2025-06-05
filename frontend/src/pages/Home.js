import Logo from "../assets/Logo.png";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Product from "../components/Product";

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const apiUrl = "http://localhost:3004/bestSelling";

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {});
  }, []);

  return (
    <Box margin={2}>
      <img src={Logo} height={270} />
      <Typography variant="h3" m={2}>
        Your Favorite Meals, Now Airborne
      </Typography>
      <Box
        mx={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {products.map((product) => (
          <Product
            name={product.name}
            image={product.image}
            price={product.price}
            key={product.id}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Home;
