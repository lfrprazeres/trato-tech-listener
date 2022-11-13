import { createListenerMiddleware } from '@reduxjs/toolkit';
import { carregarCategorias } from 'store/reducers/categorias';

export const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: carregarCategorias,
  effect: async (action) => {
    console.log('escutando carregarCategorias');
  }
});