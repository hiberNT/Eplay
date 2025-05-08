import styled from 'styled-components'
import { cores } from '../../styles'

import { Props } from '.' //importei para o estilo reconhecer o type feito no index

export const TagContainer = styled.div<Props>`
  background-color: ${cores.verde};
  color: ${cores.branca};
  font-size: ${(props) => (props.size === 'big' ? '16px' : '10px')};
  font-wight: bold;
  padding: ${(props) => (props.size === 'big' ? '8px 16px' : '4px 6px')};
  border-radius: 8px;
  display: inline-block;
`
//ternarios ? : feitos para tipagem de tags pequenos e grandes se o type size tiver com big vai ser 16px se nao(small) é 10px o msm vale pra padding
