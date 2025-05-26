import { useState } from 'react'

import Section from '../Section/Index'

import zoom from '../../assets/images/zoom.png'
import play from '../../assets/images/play.png'
import closeIcon from '../../assets/images/fechar.png'

import * as S from './styles'
//const mock: GalleryItem[] = [
// {
//  type: 'image',
//  url: spiderman
//},
// {
//   type: 'image',
//  url: hogwarts
//  },
// {
//   type: 'video',
//   url: 'https://www.youtube.com/embed/-rYdWF9Ky2U?si=JLz0zdayrgt1Yd4y'
//}
//]
//o mock é um artficio so pra usar pra preencher espaço um hard coded assim deixamos aqui ja personalizado

type Props = {
  defaultCover: string
  name: string
  items: GalleryItem[]
}

interface ModalState extends GalleryItem {
  //aqui estamos usando da herança onde pra n precisar repetir type, url, trouxemos a herança com extends
  isVisible: boolean
}

const Gallery = ({ defaultCover, name, items }: Props) => {
  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
    type: 'image',
    url: ''
  }) //colcoque <ModalState> assim pra pegar com a herança o item e usar tudo aqui o visible começa false pra img n aparecer, tipo img e url vazia

  const getMediaCover = (item: GalleryItem) => {
    if (item.type === 'image') return item.url
    return defaultCover
  }
  //fizemos essa const de getMedia para aplicar if no que vai ser retornado se vai ser url que aplicamos aqui o nome da url ou um default cover q foi tipado e vai ser passado no outro aquivo q foi importado a gallery

  const getMediaIcon = (item: GalleryItem) => {
    if (item.type === 'image') return zoom
    return play
  }
  //aqui msm caso do outro mas agr para img do zoom ou play

  const closeModal = () => {
    setModal({
      isVisible: false,
      type: 'image',
      url: ''
    })
  } //const so pra fechar, fiz const pq vou usar mais de uma vez esse codiggo pra n repetir codigos faz so uma const

  return (
    <>
      <Section title="Galeria" background="black">
        <S.Items>
          {items.map((media, index) => (
            <S.Item
              key={media.url}
              onClick={() => {
                setModal({
                  isVisible: true,
                  type: media.type,
                  url: media.url
                })
              }} //o true pra identificar q a img vai aparecer quando clicar e o media.url pra pegar a img certa que vai aparecer no clique da img tipo cliquei onde tem o homem-aranha vai aparecer o spider
            >
              <img
                src={getMediaCover(media)}
                alt={`Mídia ${index + 1} de ${name}`}
                //como index começa a contar do 0 entao coloca +1 para ser 1 o index
              />
              <S.Action>
                <img
                  src={getMediaIcon(media)}
                  alt="Clique para maximizar a imagem"
                />
              </S.Action>
            </S.Item>
          ))}
        </S.Items>
      </Section>
      <S.Modal className={modal.isVisible ? 'is-visible' : ''}>
        <S.ModalContent className="container">
          <header>
            <h4>{name}</h4>
            <img src={closeIcon} alt="Ícone de fechar" onClick={closeModal} />
          </header>
          {modal.type === 'image' ? (
            <img src={modal.url} />
          ) : (
            <iframe frameBorder={0} src={modal.url} /> //frameBorder pra tirar borda do video
          )}
        </S.ModalContent>
        <div
          onClick={() => {
            closeModal()
          }}
          className="overlay" //coloca o onclick no overlay(parte sobreposta) pra fechar quando clicar fora da img
        ></div>
      </S.Modal>
    </>
  )
}

export default Gallery
//fizemos esse arquivo para que n ficasse la no Product mt grnde, configuramos aqui para exportar apenas gallery
