import { Loader } from '../Loader/Loader'

export const withQuery = (Component) => ({isLoading, refetch, isError, error, ...rest}) => {

  if (isLoading) return <Loader />
  if (isError) return (
    <div>
      <p>{error.message}</p>
      <button onClick={refetch}>Обновить</button>
    </div>
  )

  return <Component {...rest} />
}