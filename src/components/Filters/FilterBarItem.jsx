import classNames from 'classnames'
import { useSearchParams } from 'react-router-dom'

import s from './FilterBarItem.module.css'


export function FilterBarItem({name, sortBy}) {

  const [searchParams, setSearchParams] = useSearchParams()
  const isActive = searchParams.get('sort') === sortBy

  const filterSelectHandler = () => {
    if (isActive) searchParams.delete('sort')
    else searchParams.set('sort', sortBy)
    return setSearchParams(searchParams)
  }


  return (
    <button className={classNames(s.filterItem, {[s.isActive]: isActive})} onClick={filterSelectHandler}>{name}</button>
  )
}