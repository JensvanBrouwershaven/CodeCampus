import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainRouter from './routes/routes'; // Zorg dat het pad klopt

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainRouter />
  </StrictMode>
);
