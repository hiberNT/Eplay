//pra n precisar ficar passando importe e export dentro dos arquivos o typescript tem essa função reservada pra declarar os arquivos e de forma automatica esses codigos funcionam onde precisa dele, qualquer arquivo q ta dentro de src vai refletir aqui

declare interface GalleryItem {
  type: 'image' | 'video'
  url: string
}

declare type Game = {
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
