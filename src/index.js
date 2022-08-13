import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from 'routes';
import './index.css';
import store from './store';
import { Provider } from 'react-redux';
import { createStandaloneToast } from '@chakra-ui/toast';

const { ToastContainer, toast } = createStandaloneToast();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router />
    <ToastContainer />
  </Provider>
);