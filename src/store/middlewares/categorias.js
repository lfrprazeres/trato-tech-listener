import { createListenerMiddleware } from '@reduxjs/toolkit';
import categoriasService from 'services/categorias';
import { adicionarTodasAsCategorias, carregarCategorias } from 'store/reducers/categorias';

export const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: carregarCategorias,
  effect: async (action, { dispatch, fork }) => {
    const tarefa = fork(async api => {
      return await categoriasService.buscar();
    });

    const resposta = await tarefa.result;

    if (resposta.status === 'ok') {
      dispatch(adicionarTodasAsCategorias(resposta.value));
    }
  }
});