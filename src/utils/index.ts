export const parseToBrl = (amount = 0) => {
  return new Intl.NumberFormat('pt-Br', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount) //para trasformar o dinheiro em BR
}

export const getTotalPrice = (items: Game[]) => {
  //fiezemos essa logica pra somar os jogos que estao no carrinho usamos o reducer pq ele fornece essa forma pra somar
  return items.reduce((accumulator, currentItem) => {
    if (currentItem.prices.current) {
      return (accumulator += currentItem.prices.current)
    }
    return 0
  }, 0)
}
