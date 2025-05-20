// src/layouts/ResponsiveLayout.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import { Container, Box } from '@mui/material';

const ResponsiveLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box mt={3}>
          {children}
        </Box>
      </Container>
    </>
  );
};

export default ResponsiveLayout;
