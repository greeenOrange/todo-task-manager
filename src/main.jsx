import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import routers from './routers/routers';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../Theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider  theme={Theme}>
     <RouterProvider router={routers} />
     </ThemeProvider>
  </React.StrictMode>
)
