import classNames from 'classnames';

import { FILTERS } from './constants';
import { FilterBarItem } from './FilterBarItem';
import s from './FilterBar.module.css'



export function FilterBar({emptyResult}) {

  return (
    <div className={classNames(s.container, {[s.emptyResult]: emptyResult })}>
      {FILTERS.map((item) => (
        <FilterBarItem key={item.sortBy} {...item} />
      ))}
    </div>
  )
}