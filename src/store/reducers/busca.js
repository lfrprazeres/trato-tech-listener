import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const buscaSlice = createSlice({
  name: 'busca',
  initialState,
  reducers: {
    mudarBusca: (state, { payload }) => payload,
    resetarBusca: () => initialState,
  }
});

export const { mudarBusca, resetarBusca } = buscaSlice.actions;

export default buscaSlice.reducer;