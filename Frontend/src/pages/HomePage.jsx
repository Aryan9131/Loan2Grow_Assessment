import React, { useEffect, useState } from 'react';
import ResponsiveLayout from '../layouts/Layout';
import { Grid, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../redux/slices/cartSlice';


const Home = () => {
  const [products, setProducts] = useState([]);

   const dispatch = useDispatch();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/cart`);
        dispatch(fetchCart(res.data));
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    loadCart();
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ResponsiveLayout>
      <Typography variant="h6" gutterBottom sx={{ mt: 1, mb:1 }}>
        Clothing for Men and Women
      </Typography>

      <Grid container spacing={3}>
        {products.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ProductCard item={item} />
          </Grid>
        ))}
      </Grid>
    </ResponsiveLayout>
  );
};

export default Home;
