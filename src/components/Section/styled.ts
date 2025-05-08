import styled from 'styled-components'

import { cores } from '../../styles'
import { Card } from '../Product/styles'
import { Props } from './Index'

export const Container = styled.section<Omit<Props, 'title' | 'games'>>`
  padding: 32px 0;
  background-color: ${(props) =>
    props.background === 'black' ? cores.preta : cores.cinza};

  ${Card} {
    background-color: ${(props) =>
      props.background === 'black' ? cores.cinza : cores.preta};
  }

  p {
    font-size: 14px;
    line-height: 22px;
    max-width: 640px;
  }
`
//omitindo title pra n pedir o uso dela, apenas o uso do background e fazendo ternarios pra mudança de cores de fundo
//puxando o Card de outra pasta de estilos para mudar a cor de fundo dos cards

export const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 40px;
`
