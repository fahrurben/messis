import useAuthenticated from "../../hooks/use-authenticated.hook.ts"

const Home = () => {
  useAuthenticated()

  return <div>Home</div>
}

export default Home
