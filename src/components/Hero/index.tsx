import { Banner, Infos } from './styles'
import Button from '../Button'
import Tag from '../Tag'
import { useDispatch } from 'react-redux'
import { add, open } from '../../store/reducers/cart'
import { parseToBrl } from '../../utils'

type Props = {
  game: Game
}

const Hero = ({ game }: Props) => {
  const dispatch = useDispatch()

  const addToCart = () => {
    //aqui a gente passa o game no argumento do add pq queremos aplicar as especificações do game que é api dos jogos
    dispatch(add(game))
    dispatch(open())
  }

  return (
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
              <span> De {parseToBrl(game.prices.old)} </span> //so vai aparecer o desconto quando o game tiver la no api discoount se n tiver so aparece preço normal
            )}
            {game.prices.current && (
              <>Por {parseToBrl(game.prices.current)}</> //so aparece o preço se tiver na api o preço, ex se o jogo ainda n tiver lançado nao aparece preço
            )}
          </p>
          {game.prices.current && (
            <Button
              title="Clique aqui para adicionar o item ao carrinnhi"
              variant="primary"
              type="button"
              onClick={addToCart}
            >
              Adicionar ao carrinho
            </Button>
          )}
        </Infos>
      </div>
    </Banner>
  )
}

export default Hero
