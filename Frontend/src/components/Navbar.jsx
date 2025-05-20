// src/components/Navbar.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'CLOTHINGS', path: '/' },       // Update with correct route when ready
    { label: 'ACCESSORIES', path: '/' }      // Update with correct route when ready
  ];

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{ color: '#2d9cdb', fontWeight: 600, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            SHOPLANE
          </Typography>

          {/* Desktop Nav Items */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 4 }}>
              {navItems.map((item) => (
                <Typography
                  key={item.label}
                  variant="body1"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          )}

          {/* Right Side: Cart & User Icon */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => navigate('/cart')}>
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                alt="User Icon"
                style={{ width: 24, height: 24 }}
              />
            </IconButton>

            {/* Hamburger for Mobile */}
            {isMobile && (
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Navigation */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.label} onClick={() => navigate(item.path)}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
