import { parseToBrl } from '../../utils'
import Loader from '../Loader'
import Product from '../Product'
import { Container, List, Title } from './styles'

export type Props = {
  title: string
  background: 'gray' | 'black'
  games?: Game[] //fiz o contructor Game para poder ter um modelo dinamico dos produtos para na ficar hard coder(estatico)
  id?: string //fazemos esse id para os links do rodape funcionar e levar pra categoria certa quando clicarmos
  isLoading: boolean //para aparecer o loading personalizado do pacman
}

const ProductList = ({ title, background, games, id, isLoading }: Props) => {
  const getGamesTags = (game: Game) => {
    //essa const é para renderizar itens especificos, se for o release pega a data, prices.discount o desconto e price o preço em formato BR
    const tags = []

    if (game.release_date) {
      tags.push(game.release_date)
    }

    if (game.prices.discount) {
      tags.push(`${game.prices.discount}%`)
    }

    if (game.prices.current) {
      tags.push(parseToBrl(game.prices.current))
    }

    return tags
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Container id={id} background={background}>
      <div className="container">
        <Title>{title}</Title>
        <List>
          {games && //como games type é opcional passamos um if que so renderiza o game quando existir um game pois o game recebe o data e o data pode ser undfined quando tiver carregando o conteudo ou seja n tem conteúdo ainda
            games.map((game) => (
              <li key={game.id}>
                <Product
                  id={game.id}
                  category={game.details.category}
                  description={game.description}
                  image={game.media.thumbnail}
                  infos={getGamesTags(game)}
                  system={game.details.system}
                  title={game.name}
                />
              </li>
            ))}
        </List>
      </div>
    </Container>
  )
} ////acessando as infos configuradas na Home em List
// joguei o titulo e lista de produtos para dentro do container configurada para no estilo global e assim a lista de prdutos fica dentro do padrao do site ficar tudo alinhado

export default ProductList
//aqui configurado a lista de produtos q abriga todos os produtos que sao os jogos
