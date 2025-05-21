import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Typography,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL // adjust this as needed

const Cart = () => {
  const [items, setItems] = useState([]);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/cart`);
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  // Change quantity
  const updateQuantity = async (id, quantity) => {
    try {
      const res = await axios.put(`${BACKEND_URL}/cart/${id}`, { quantity });
      setItems(res.data);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`${BACKEND_URL}/cart/${id}`, { withCredentials: true });
      setItems(res.data);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = items?.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4">Your Cart</Typography>
       <div style={{ width:'90vw', padding: '2rem', display:'flex', flexDirection:'column', alignItems:'center' }}>
         {items?.map(({ product, quantity }) => (
        <div key={product.id} style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
          <img src={product.image} width={80} />
           <div style={{display:'flex', width:'100%', flexDirection:'column', padding:"5px 10px", margin:"0px 10px"}}>
             <Typography style={{ flex: 1 }}>{product.title}</Typography>
             <Typography >${product.price}</Typography>
           </div>

          <IconButton onClick={() => updateQuantity(product.id, quantity - 1)} disabled={quantity <= 1}>
            <RemoveIcon />
          </IconButton>
          <Typography>{quantity}</Typography>
          <IconButton onClick={() => updateQuantity(product.id, quantity + 1)}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={() => deleteItem(product.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
       </div>
      <Typography variant="h6">Total: ${total?.toFixed(2)}</Typography>
    </div>
  );
};

export default Cart;
