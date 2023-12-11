import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from 'Router';
import { memo } from 'react';

const App = () => 
  (
    <BrowserRouter>
      <Router />
      </BrowserRouter>
  );

export default memo(App);
