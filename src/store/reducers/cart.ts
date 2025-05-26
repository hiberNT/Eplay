import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartState = {
  items: Game[]
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  isOpen: false //começa false pq queremos que a aba carrnho so aparece quando clica por issa passa o open como true no botao do carrinho do header
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Game>) => {
      //ação que adiciona o item ao carrinho, recebe o item mandado passa o Game pra o payload saber que deve manter essa estrutura como esta la na api de game
      const game = state.items.find((item) => item.id === action.payload.id)

      if (!game) {
        state.items.push(action.payload) //o push junto da action adiciona um novo jogo pois esta ali ligado ao payload que traz os itens de Game
      } else {
        alert('O jogo ja esta no carrinho')
      }
    },
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    },
    remove: (state, action: PayloadAction<number>) => {
      //quando fazemos o dispatch no item do carrinho q queremos remover ele manda o id que clicamos pro payload ai quando cai na logica a baixo o filter cria os arrays dos jogos e compara com o id q vem do dispatch dai quando os id iguas se encontarm sabe qual item remover pois n pode existir 2 id igauis
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clear: (state) => {
      //para esvaziar o carrinho depois de finalizar a compra
      state.items = []
    }
  }
})

export const { add, open, close, remove, clear } = cartSlice.actions
export default cartSlice.reducer
