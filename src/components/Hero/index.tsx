import { Game } from '../../Pages/Home'
import { Banner, Infos } from './styles'
import Button from '../Button'
import Tag from '../Tag'
import { formatoPreco } from '../ProductList'

type Props = {
  game: Game
}

const Hero = ({ game }: Props) => (
  <Banner style={{ backgroundImage: `url(${game.media.cover})` }}>
    <div className="container">
      <div>
        <Tag>{game.details.category}</Tag>
        <Tag>{game.details.system}</Tag>
      </div>
      <Infos>
        <h2>{game.name}</h2>
        <p>
          {game.prices.discount && (
            <span> De {formatoPreco(game.prices.old)} </span> //so vai aparecer o desconto quando o game tiver la no api discoount se n tiver so aparece preço normal
          )}
          {game.prices.current && (
            <>Por {formatoPreco(game.prices.current)}</> //so aparece o preço se tiver na api o preço, ex se o jogo ainda n tiver lançado nao aparece preço
          )}
        </p>
        {game.prices.current && (
          <Button
            title="Clique aqui para adicionar o item ao carrinnhi"
            variant="primary"
            type="button"
          >
            Adicionar ao carrinho
          </Button>
        )}
      </Infos>
    </div>
  </Banner>
)

export default Hero
