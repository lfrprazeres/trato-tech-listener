import { createListenerMiddleware } from '@reduxjs/toolkit';
import { carregarUmaCategoria } from 'store/reducers/categorias';

export const itensListener = createListenerMiddleware();

itensListener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async () => {
    console.log('carregando itens');
  }
})