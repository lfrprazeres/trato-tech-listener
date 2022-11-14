import { createListenerMiddleware } from '@reduxjs/toolkit';
import itensService from 'services/itens';
import { carregarUmaCategoria } from 'store/reducers/categorias';
import { adicionarItens } from 'store/reducers/itens';
import criarTarefa from './utils/criarTarefa';

export const itensListener = createListenerMiddleware();

itensListener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async (action, { fork, dispatch, unsubscribe, getState }) => {
    const { itens } = getState();

    if (itens.length === 25) return unsubscribe();

    const nomeCategoria = action.payload;

    const itensCarregados = itens.some(item => item.categoria === nomeCategoria);

    if (itensCarregados) return;

    await criarTarefa({
      fork,
      dispatch,
      action: adicionarItens,
      busca: () => itensService.buscarDeCategorias(nomeCategoria),
      textoCarregando: `Carregando itens da categoria ${nomeCategoria}`,
      textoSucesso: `Itens da categoria ${nomeCategoria} carregadas com sucesso!`,
      textoErro: 'Erro na busca de itens',
    });
  }
})