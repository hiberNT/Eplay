import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'
import Categories from './Pages/Categories'
import Product from './Pages/Product'

const Rotas = () => (
  //sitemas de rotas para navegaçao de paginas, o BrowserRouter tenho que englobar em tudo que vou querer que navegue
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/product/:id" element={<Product />} />
  </Routes>
) //esse id dps de product é pra mudança de id dinamico pois configuramos la no arquivo do product um params q faz esse serviço

export default Rotas
