import { Loader } from '../Loader/Loader'

export const withQuery = (Component) => ({isLoading, refetch, isError, error, ...rest}) => {

  if (isError) return (
    <div>
      <p>{error.message}</p>
      <button onClick={refetch}>Обновить</button>
    </div>
  )
  if (isLoading) return <Loader />

  return <Component {...rest} />
}