import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  increment, 
  decrement 
} from '../redux/slices/cartSlice';
import { Button, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const total = items?.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4">Your Cart</Typography>
      {items?.map(({ product, quantity }) => (
        <div key={product.id} style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
          <img src={product.image} width={80} />
          <Typography style={{ flex: 1 }}>{product.title}</Typography>
          <IconButton onClick={() => dispatch(decrease(product.id))}><RemoveIcon /></IconButton>
          <Typography>{quantity}</Typography>
          <IconButton onClick={() => dispatch(increase(product.id))}><AddIcon /></IconButton>
          <IconButton onClick={() => dispatch(removeFromCart(product.id))}><DeleteIcon /></IconButton>
        </div>
      ))}
      <Typography variant="h6">Total: ${total?.toFixed(2)}</Typography>
    </div>
  );
};

export default Cart;
