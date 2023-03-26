import { useState } from 'react';
import classNames from 'classnames';

import { Star } from './Star'
import style from './Rating.module.css'

export function Rating({rating, form}) {

  const [starRating, setStarRating] = useState(() => {
    if (rating) return rating
    return 5
  });
  const [hover, setHover] = useState(null);
  const readOnly = rating ? true : false
  return (
    <div className={classNames(style['rating-result'], {[style.readOnly]: readOnly})}>
      {[...Array(5)].map((star, i) => {
        const stars = i + 1
        return <Star
          key={i} stars={stars} hover={hover} starRating={starRating} readOnly={readOnly}
          setStarRating={setStarRating} setHover={setHover} form={form}/>
      })}
    </div>
  )
}