import { configureStore } from '@reduxjs/toolkit';
import categoriasSlice from './reducers/categorias';
import itensSlice from './reducers/itens';
import carrinhoSlice from './reducers/carrinho';
import buscaSlice from './reducers/busca';
import { categoriasListener } from './middlewares/categorias';
import { itensListener } from './middlewares/itens';

const store = configureStore({
  reducer: {
    categorias: categoriasSlice,
    itens: itensSlice,
    carrinho: carrinhoSlice,
    busca: buscaSlice,
  },
  middleware:
    getDefaultMiddleware =>
      getDefaultMiddleware().prepend(
        categoriasListener.middleware,
        itensListener.middleware
      ),
});

export default store;