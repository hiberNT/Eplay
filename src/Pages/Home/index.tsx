import Banner from '../../components/Banner'
import ProductList from '../../components/ProductList'

import { useEffect, useState } from 'react'

export interface GalleryItem {
  type: 'image' | 'video'
  url: string
}

export type Game = {
  id: number
  name: string
  description: string
  release_date?: string
  prices: {
    discount?: number
    old?: number
    current: number
  }
  details: {
    category: string
    system: string
    developer: string
    publisher: string
    languages: string[]
  }
  media: {
    thumbnail: string
    cover: string
    gallery: GalleryItem[]
  } //essas config o prof crioo pegando as referencias do site das fakes api se eu quiser é so pegat o https do site e ve na net msm
}

const Home = () => {
  const [promocoes, setPromocoes] = useState([])
  const [emBreve, setEmBreve] = useState([])

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/eplay/promocoes')
      .then((res) => res.json())
      .then((res) => setPromocoes(res))

    fetch('https://fake-api-tau.vercel.app/api/eplay/em-breve')
      .then((res) => res.json())
      .then((res) => setEmBreve(res))
  }, [])
  return (
    <>
      <Banner />
      <ProductList games={promocoes} title="Promoções" background="gray" />
      <ProductList games={emBreve} title="Em breve" background="black" />
    </>
  )
} //antes tinhamos uma listagem de games com a pasta de models(com this, constructor...), mas como vamos resgatar os jogos de uma api n precisa mais da listagem de games

export default Home