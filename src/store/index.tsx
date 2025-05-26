import { configureStore } from '@reduxjs/toolkit'

import api from '../services/api'

import cartReducer from './reducers/cart'

export const store = configureStore({
  reducer: {
    //recebe um estado atual da ação e retorna um novo estado
    cart: cartReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware) //o middleware intermedia as actions antes de chegar ao reducer para tratar logica ou realizar tarefas adicionais e tratamentos de erros
})

export type RootReducer = ReturnType<typeof store.getState> //esse typeof nos retorna o valor do item tipo tenho um idade = 10 o type retorna q é um number
