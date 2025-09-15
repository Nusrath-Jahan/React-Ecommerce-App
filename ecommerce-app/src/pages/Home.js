import React, { useState, useEffect} from "react";
import axios  from "axios";
import { Grid, Card, CardContent, CardMedia, Typography, Button} from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

useEffect(() => {
  axios.get("https://fakestoreapi.com/products")
  .then(res => setProducts(res.data))
  .catch(err => console.error(err));
}, []);

return (
<Grid container spacing={2}>
  {products.map((product) => (
<Grid item xs={12} sm={6} key={product.id}>
<Card>
<CardMedia component={"img"} image={product.image} alt="{product.title}" sx={{ width: 200, height: 200, objectFit: "contain", margin: "auto" }} />
  <CardContent>
    <Typography variant="h6" sx={{ width: 200, height: 200, objectFit: "contain", margin: "auto" }}> {product.title} </Typography>
    <Typography variant="body2" color="text.secondary"> ${product.price} </Typography>
    <Button component={Link} to={`/product/${product.id}`} variant="contained" sx={{ mt: 1}}> View Details</Button>
    </CardContent>
</Card>
  </Grid>
  ))}
  </Grid>
  );
}
 
export default Home;
             

// variant prop in Material-UI’s <Typography> component specifies the style of the text, such as its size and weight. It maps to different HTML tags and Material Design styles.
// variant="h4" renders large, bold text for headings, while variant="body1" renders standard paragraph text. It helps maintain consistent typography across the app.
// variant="body2" in Material-UI’s <Typography> component means the text will use the "body2" style, which is typically smaller and lighter than the default body text. It’s useful for secondary or less important information, like descriptions or prices. This helps keep your text visually organized and consistent across your app.
// The sx prop in Material-UI allows you to apply custom styles directly to a component using a JavaScript object. It provides a convenient way to style components inline without needing separate CSS files.