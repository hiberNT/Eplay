import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '../Button'

import Tag from '../Tag'

import { RootReducer } from '../../store'
import { close, remove } from '../../store/reducers/cart'

import * as S from './styles'
import { parseToBrl, getTotalPrice } from '../../utils'

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart) //uso o isOpen que vem la do reducers com o estado inical que é falso ja que quero que comece fechado a aba carrinho
  const navigate = useNavigate()

  const dispatch = useDispatch() //para fechar o carrinho
  const closeCart = () => {
    dispatch(close())
  }

  const removeItem = (id: number) => {
    //pra mandar pro reducer do cart qual jogo queremos remover
    dispatch(remove(id))
  }

  const goToCheckout = () => {
    //apertar o botao pra levar para a pagina de checkout e fechar o cart ao msm tempo
    navigate('/checkout')
    closeCart()
  }

  return (
    //nesse ternario ? : estamos passando que se o isOpen(azul) for true o isOpen class que ta configurado css vai ser adiconado ao container caso for false nada é adiconado e nao ativa a o estilo css
    <S.CartContainer className={isOpen ? 'is-open' : ''}>
      <S.Overlay onClick={closeCart} />
      <S.Sidebar>
        {items.length > 0 ? ( //If carrinho quando tiver algum item nele renderiza os itens do carrinho tbm
          <>
            <ul>
              {items.map((item) => (
                <S.CartItem key={item.id}>
                  <img src={item.media.thumbnail} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <Tag>{item.details.category}</Tag>
                    <Tag>{item.details.system}</Tag>
                    <span>{parseToBrl(item.prices.current)}</span>
                  </div>
                  <button onClick={() => removeItem(item.id)} type="button" />
                </S.CartItem>
              ))}
            </ul>
            <S.Quantity>{items.length} jogo(s) no carrinho</S.Quantity>
            <S.Prices>
              Total de {parseToBrl(getTotalPrice(items))}{' '}
              <span>Em 6x sem juros</span>
            </S.Prices>
            <Button
              onClick={goToCheckout}
              title="Clique aqui pra continuar a compra"
              type="button"
            >
              Continuar com a compra
            </Button>
          </>
        ) : (
          //else, se n tiver nenhum item do carrinho renderiza a legenda de vazio
          <p className="empty-text">
            O carrinho está vazio, adicione pelo menos um produto pra continuar
            com a compra
          </p>
        )}
      </S.Sidebar>
    </S.CartContainer>
  )
}

export default Cart
