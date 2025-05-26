import Tag from '../Tag'
import Button from '../Button'
import Loader from '../Loader'

import { useGetFeaturedGameQuery } from '../../services/api'

import * as S from './styles'
import { parseToBrl } from '../../utils'

const Banner = () => {
  const { data: game } = useGetFeaturedGameQuery() //pra n precisar trocar o nome dos itens que estao sendo puxados da api a gente faz data se chamar do msm nome

  if (!game) {
    return <Loader />
  } //para n da erro nos game que tem ?(n é obrigatorio)

  return (
    <S.Image style={{ backgroundImage: `url(${game.media.cover})` }}>
      <div className="container">
        <Tag size="big">Destaque do dia</Tag>
        <div>
          <S.Title>{game.name}</S.Title>
          <S.Prices>
            De <s>{parseToBrl(game.prices.old)}</s> <br />
            por apenas {parseToBrl(game.prices.current)}
          </S.Prices>
        </div>
        <Button //para levar esse botao a direita do banner tive que fazer essa div acima so pro titulo e precos assim n entre em conflito
          type="link"
          to={`/product/${game.id}`}
          title="Clique aqui para aproveitar esta oferta"
        >
          Aproveitar
        </Button>
      </div>
    </S.Image>
  )
}

export default Banner
