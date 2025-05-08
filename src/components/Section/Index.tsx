import { Container, Title } from './styled'

export type Props = {
  title: string
  background: 'black' | 'gray'
  children: JSX.Element
}
//fazendo props para poder reutilxar cores diferentes e titulos diferentes reaproveitando os estilos no arquivo de Product

const Section = ({ title, background, children }: Props) => (
  <Container background={background}>
    <div className="container">
      <Title>{title}</Title>
      {children}
    </div>
  </Container>
)

export default Section
