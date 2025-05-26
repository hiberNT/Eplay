import styled from 'styled-components'
import { breakpoints, cores } from '../../styles'
import { TagContainer } from '../Tag/styles'

export const Banner = styled.div` 
  psoition: relative;
  display: block;
  height: 480px;
  widht: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  padding-top: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    background-size: cover;
  }

  & ::after {
  position: absolute;
  background-color: #000
  widht: 100%;
  heigh: 100%
  top: 0;
  left: 0;
  content: '';
  opacity: 0.56;
  }

  ${TagContainer} {
    margin-right: 8px;
  }

  .container {
    z-index: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }
`
//size 100% pra img ocupar todo o espaço e center posicionar ao centro
//o q ta dps do after é pra estilizar apenas o fundo da img, e como nao temos conteudo ao fundo deixa vazio content: '';
//o index pra deixar todos os contteudos que estao dentro do container acima da img
//flex-direction pra aplicar os itens em colunas e assim com space between separar uma div da outra uma ficando em cima outra em baixo pois estao em colunas

export const Infos = styled.div`
  padding: 16px;
  background-color: ${cores.preta};
  max-width: 290px;
  font-weight: bold;

  h2 {
    font-size: 32px;
  }

  p {
    font-size: 18px;
    margin: 16px 0;
  }

  span {
    display: block;
    text-decoration: line-through;
  }
`
