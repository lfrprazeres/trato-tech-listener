import { createListenerMiddleware } from '@reduxjs/toolkit';
import categoriasService from 'services/categorias';
import { adicionarTodasAsCategorias, adicionarUmaCategoria, carregarCategorias, carregarUmaCategoria } from 'store/reducers/categorias';
import criarTarefa from './utils/criarTarefa';

export const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: carregarCategorias,
  effect: async (action, { dispatch, fork, unsubscribe }) => {
    await criarTarefa({
      fork,
      dispatch,
      action: adicionarTodasAsCategorias,
      busca: categoriasService.buscar,
      textoCarregando: 'Carregando categorias',
      textoSucesso: 'Categorias carregadas com sucesso!',
      textoErro: 'Erro na busca de categorias',
    });
    unsubscribe();
  }
});

listener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async (action, { fork, dispatch }) => {
    const nomeCategoria = action.payload;
    await criarTarefa({
      fork,
      dispatch,
      action: adicionarUmaCategoria,
      busca: () => categoriasService.buscarUmaCategoria(nomeCategoria),
      textoCarregando: `Carregando categoria ${nomeCategoria}`,
      textoSucesso: `Categoria ${nomeCategoria} carregada com sucesso!`,
      textoErro: `Erro na busca da categoria ${nomeCategoria}`,
    });
  }
})