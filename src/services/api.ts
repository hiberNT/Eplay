import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Product = {
  id: number
  price: number
}

type PurchasePayload = {
  products: Product[]
  billing: {
    name: string
    email: string
    document: string
  }
  delivery: {
    email: string
  }
  payment: {
    card: {
      active: boolean
      owner?: {
        name: string
        document: string
      }
      name?: string
      number?: string
      expires?: {
        month: number
        year: number
      }
      code?: number
    }
    installments: number
  }
}

type PurchaseResponse = {
  //o retorno q temos quando finaliza a compra é uma string
  orderId: string
}

const api = createApi({
  //esa config é pra n precisarmos fazer a requesicao facth api direto nas paganas
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-api-tau.vercel.app/api/eplay'
  }),
  endpoints: (builder) => ({
    getFeaturedGame: builder.query<Game, void>({
      //esse featuredGame posso dar qualquer nome mas pra seguir a logica entao como ta configurando a api do game destacado que chama featured em ingles
      query: () => 'destaque'
    }),
    getOnSale: builder.query<Game[], void>({
      query: () => 'promocoes'
    }),
    getSoon: builder.query<Game[], void>({
      query: () => 'em-breve'
    }),
    getActionGames: builder.query<Game[], void>({
      query: () => 'acao'
    }),
    getSportGames: builder.query<Game[], void>({
      query: () => 'esportes'
    }),
    getSimulationGames: builder.query<Game[], void>({
      query: () => 'simulacao'
    }),
    getFightGames: builder.query<Game[], void>({
      query: () => 'luta'
    }),
    getRgpGames: builder.query<Game[], void>({
      query: () => 'rpg'
    }),
    getGame: builder.query<Game, string>({
      query: (id) => `jogos/${id}` //aqui é mais diferente pois estamos trazendo id do item na api entao passa string e n void pois quando pegamos o id na requisição vem jogo/1 esse 1 por mais q seja numero o react entende como string e identifica que queremos o id
    }),
    purchase: builder.mutation<PurchaseResponse, PurchasePayload>({
      //o mutation manda os dados PurchasePayload pro servidor, vamos inserir um novo pedido na loja
      query: (body) => ({
        url: 'checkout',
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useGetFeaturedGameQuery,
  useGetSoonQuery,
  useGetOnSaleQuery,
  useGetSportGamesQuery,
  useGetActionGamesQuery,
  useGetFightGamesQuery,
  useGetRgpGamesQuery,
  useGetSimulationGamesQuery,
  useGetGameQuery,
  usePurchaseMutation
} = api

export default api
