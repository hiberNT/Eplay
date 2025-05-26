import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader'

import Hero from '../../components/Hero'
import Section from '../../components/Section/Index'
import Gallery from '../../components/Gallery'

import { useGetGameQuery } from '../../services/api'

type GameParams = {
  //pra n precisar passar !game pra tornar obrigatorio o uso do type
  id: string
}

const Product = () => {
  const { id } = useParams() as GameParams //para deixar dinamico a troca de id das pagina do site
  const { data: game } = useGetGameQuery(id)

  if (!game) {
    return <Loader />
  } //para n da erro nos game que tem ?(n é obrigatorio) assim n fica undefinid

  return (
    <>
      <Hero game={game} />
      <Section title="Sobre o jogo" background="black">
        <p>{game.description}</p>
      </Section>
      <Section title="Mais detalhes" background="gray">
        <p>
          <b>Plataforma</b>: {game.details.system} <br />
          <b>Desenvolvedor</b>: {game.details.developer} <br />
          <b>Editora</b>: {game.details.publisher} <br />
          <b>Idiomas:</b> O jogo oferece suporte a diversos idiomas, incluindo{' '}
          {game.details.languages.join(', ')}
          entre outros.
        </p>
      </Section>
      <Gallery
        name={game.name}
        defaultCover={game.media.cover}
        items={game.media.gallery}
      />
    </> //esse join é para separar as palavrar com uma virgula e um espaço
  )
}

export default Product
