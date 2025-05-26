import styled from 'styled-components'
import { TagContainer } from '../Tag/styles'

export const Image = styled.div`
  width: 100%;
  height: 560px;
  display: block;
  background-repeat: no-repeat;
  background-size: cover;
  font-weight: bold;
  position: relative;

  .container {
    position: relative;
    padding-top: 340px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    z-index: 1;
  }

  ${TagContainer} {
    position: absolute;
    top: 32px;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    content: '';
  }
` //para posicionar o tag destaque acima no banner trouxemos o conatiner da tag para a estulizaçao do banner para deixar a tag absolute em relaçao relativa ao banner
//o  justify-content: space-between; no .container é pra separar o titulo e preço q estao em uma div so deles e o butao vai pro outro lado

export const Title = styled.h2`
  font-size: 36px;
  max-width: 450px;
`

export const Prices = styled.p`
  font-size: 24px;
  margin-top: 24px;
`
