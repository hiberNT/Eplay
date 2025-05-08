import { HeaderBar, Links, LinksItem, LinkCarrinho } from './styled'

import logo from '../../assets/images/logo.svg'
import carrinho from '../../assets/images/carrinho.svg'
import { Link } from 'react-router-dom'

const Header = () => (
  //o justify-content: space-between é aplicado entre a div e o link carrinho fiz isso para conseguir deixar a direita absoluta o carrinho se n dividir o justifi aplica em todos os itens e fica errado
  <HeaderBar>
    <div>
      <Link to={'/'}>
        <img src={logo} alt="EPLAY" />
      </Link>
      <nav>
        <Links>
          <LinksItem>
            <Link to="/categories">Categorias</Link>
          </LinksItem>
          <LinksItem>
            <a href="">Novidades</a>
          </LinksItem>
          <LinksItem>
            <a href="">Promoções</a>
          </LinksItem>
        </Links>
      </nav>
    </div>
    <LinkCarrinho href="">
      0 - produto(s)
      <img src={carrinho} alt="Carrinho" />
    </LinkCarrinho>
  </HeaderBar>
)

export default Header
