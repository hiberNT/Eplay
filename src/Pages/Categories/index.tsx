import ProductList from '../../components/ProductList'
import {
  useGetActionGamesQuery,
  useGetFightGamesQuery,
  useGetRgpGamesQuery,
  useGetSimulationGamesQuery,
  useGetSportGamesQuery
} from '../../services/api'

const Categories = () => {
  //faz um fecth pra cada uma das categorias pra assim puxar os jogos e suas infos, infos essas é resgatada por conta do Game q ta la em Home configurada
  const { data: actionGames, isLoading: isLoadingAction } =
    useGetActionGamesQuery() //passa a data para carregar os conteudos do Game e o isLoading pra aparecer o loading
  const { data: fightGames, isLoading: isLoadingFight } =
    useGetFightGamesQuery()
  const { data: rpgGames, isLoading: isLoadingRpg } = useGetRgpGamesQuery()
  const { data: simulationGames, isLoading: isLoadingSimulation } =
    useGetSimulationGamesQuery()
  const { data: sportGames, isLoading: isLoadingSport } =
    useGetSportGamesQuery()

  return (
    <>
      <ProductList
        games={actionGames}
        title="Ação"
        background="black"
        id="action"
        isLoading={isLoadingAction}
      />
      <ProductList
        games={sportGames}
        title="Esporte"
        background="gray"
        id="sport"
        isLoading={isLoadingSport}
      />
      <ProductList
        games={fightGames}
        title="Luta"
        background="black"
        id="fight"
        isLoading={isLoadingFight}
      />
      <ProductList
        games={rpgGames}
        isLoading={isLoadingRpg}
        title="RPG"
        background="gray"
        id="rpg"
      />
      <ProductList
        games={simulationGames}
        title="Simulação"
        background="black"
        id="simulation"
        isLoading={isLoadingSimulation}
      />
    </>
  )
}
export default Categories
