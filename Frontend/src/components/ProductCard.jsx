import { Typography, Card, CardContent, CardMedia, Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import axios from 'axios';

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    dispatch(addToCart(item));

    try {
      await axios.post(`${import.meta.env['VITE_BACKEND_BASE_URL']}/cart/add`, {
        product: item,
        quantity: 1,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        '&:hover .card-image': {
          transform: 'scale(1.08)',
        },
      }}
    >
      <Box
        sx={{
          height: 200,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9f9f9',
          p: 2,
        }}
      >
        <CardMedia
          component="img"
          image={item.image}
          alt={item.title}
          className="card-image"
          sx={{
            transition: 'transform 0.3s ease',
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom noWrap>
          {item.title}
        </Typography>
        {item?.brand && (
          <Typography variant="body2" color="text.secondary">
            {item.brand}
          </Typography>
        )}
        <Typography variant="body1" color="success.main">
          ${item.price}
        </Typography>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button variant="contained" fullWidth onClick={handleAddToCart} sx={{ mt: 1, backgroundColor: '#2d9cdb' }}>
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
