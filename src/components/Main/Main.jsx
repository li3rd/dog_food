import { useSelector } from 'react-redux'

import { getUserToken } from '../../store/slices/user.slice'
import { Products } from '../Products/Products'

export function Main() {
  const token = useSelector(getUserToken)
  // eslint-disable-next-line max-len
  const url = 'https://pabliko.ru/files/article_image/2022/05/18/0_%D0%93%D0%BE%D0%BB%D0%BE%D0%B4%D0%BD%D1%8B%D0%B9_%D0%BF%D0%B5%D1%81.jpeg'
  if (token) return <Products />
  return (
    <div>
      <img src={url} alt="sad dog" />
    </div>
  )
}