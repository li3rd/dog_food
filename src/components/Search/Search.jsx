import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { changeSearchState } from '../../store/slices/search.slice'
import { useDebounce } from '../hooks/useDebounce'


export function Search () {

  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => {
    return searchParams.get('q') ?? ''
  })
  const dispatch = useDispatch()
  const dbSearchValue = useDebounce(search)

  useEffect(()=> {
    setSearch(searchParams.get('q') ?? '')
  },[searchParams, search])

  const onChangeSearchHandler = (ev) => {
    const searchValue = ev.target.value
    setSearch(searchValue)
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      q: searchValue
    })
  }
  useEffect(() => {
    dispatch(changeSearchState(dbSearchValue))
  },[dbSearchValue, dispatch])
  

  return (
    <input
      placeholder="Поиск"
      onChange={onChangeSearchHandler}
      value={search}
    />
  )
}