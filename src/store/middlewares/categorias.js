import { createStandaloneToast } from '@chakra-ui/toast';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import categoriasService from 'services/categorias';
import { adicionarTodasAsCategorias, carregarCategorias, carregarUmaCategoria } from 'store/reducers/categorias';
import criarTarefa from './utils/criarTarefa';

export const listener = createListenerMiddleware();
const { toast } = createStandaloneToast();

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
  effect: async () => {
    console.log('carregar apenas uma categoria');
  }
})