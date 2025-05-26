import * as S from './styled'

import logo from '../../assets/images/logo.svg'
import cartIcon from '../../assets/images/carrinho.svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { open } from '../../store/reducers/cart'
import { RootReducer } from '../../store'
import { useState } from 'react'
import { HashLink } from 'react-router-hash-link'

const Header = () => {
  const dispatch = useDispatch() //usado pra mandar a ação de abrir a aba de carrinho pro reducer e funcionar
  const { items } = useSelector((state: RootReducer) => state.cart)
  const [isMenuOpen, setIsMenuOpen] = useState(false) //botao do menu hamburguer funcionar e mostar os links quando clicado

  const openCart = () => {
    dispatch(open())
  }
  //o justify-content: space-between é aplicado entre a div e o link carrinho fiz isso para conseguir deixar a direita absoluta o carrinho se n dividir o justifi aplica em todos os itens e fica errado

  return (
    //quando o IsMenuOpen esta positivo no caso sem ! ativa o estilo do css
    <S.HeaderBar>
      <S.HeaderRow>
        <div>
          <S.Hamburguer onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span />
            <span />
            <span />
          </S.Hamburguer>
          <Link to={'/'}>
            <h1>
              <img src={logo} alt="EPLAY" />
            </h1>
          </Link>
          <nav>
            <S.Links>
              <S.LinksItem>
                <Link
                  title="Clique aqui para acessar a página de categorias"
                  to="/categories"
                >
                  Categorias
                </Link>
              </S.LinksItem>
              <S.LinksItem>
                <HashLink
                  title="Clique aqui para acessar a seção em breve"
                  to="/#coming-soon"
                >
                  Novidades
                </HashLink>
              </S.LinksItem>
              <S.LinksItem>
                <HashLink
                  title="Clique aqui para acessar a seção em breve"
                  to="/#on-sale"
                >
                  Promoções
                </HashLink>
              </S.LinksItem>
            </S.Links>
          </nav>
        </div>
        <S.CartButton role="button" onClick={openCart}>
          {items.length} <span> - produto(s)</span>
          <img src={cartIcon} alt="Carrinho" />
        </S.CartButton>
      </S.HeaderRow>
      <S.NavMobile className={isMenuOpen ? 'is-open' : ''}>
        <S.Links>
          <S.LinksItem>
            <Link
              title="Clique aqui para acessar a página de categorias"
              to="/categories"
              onClick={() => setIsMenuOpen(false)}
            >
              Categorias
            </Link>
          </S.LinksItem>
          <S.LinksItem>
            <HashLink
              title="Clique aqui para acessar a seção em breve"
              to="/#coming-soon"
              onClick={() => setIsMenuOpen(false)}
            >
              Em-breve
            </HashLink>
          </S.LinksItem>
          <S.LinksItem>
            <HashLink
              title="Clique aqui para acessar a seção de promoções"
              to="/#on-sale"
              onClick={() => setIsMenuOpen(false)}
            >
              Promoções
            </HashLink>
          </S.LinksItem>
        </S.Links>
      </S.NavMobile>
    </S.HeaderBar>
  )
}

export default Header
//o role no cartButton tem função de fazer papel de algo e aqui faz a funcao de botao pois esta estilizado como span
