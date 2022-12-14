
export default function Home(props:any) {

  return (
    <h1>Pools: {props.count}</h1>
  )
}

export const getServerSideProps = async () => {

  const response = await fetch('http://127.0.0.1:3333/pools/count')
  const data = await response.json()

  return {
    props: {
      count: data.pools,
    }
  }
}