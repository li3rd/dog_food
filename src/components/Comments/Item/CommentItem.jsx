import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { dfApi } from '../../../api/DogFoodApi';
import { getUserId, getUserToken } from '../../../store/slices/user.slice';
import { Rating } from '../Rating/Rating';

import s from './CommentItem.module.css'

export function CommentItem({rating, id, author, text, created_at}) {
  const token = useSelector(getUserToken)
  const userId = useSelector(getUserId)
  const { productId } = useParams()
  const queryClient= useQueryClient()
  
  const isYours = userId === author._id

  let time = new Date(Date.parse(created_at))
  time = time.toLocaleDateString()

  const {mutateAsync} = useMutation({
    mutationFn: () => dfApi.deleteCommentById(productId, id, token)
  })

  const deleteHandler = async () => {
    await mutateAsync()
    await queryClient.refetchQueries()}

  return (
    <>
      <div className={s.container}>
        <div className={s.image}><img src={author.avatar} alt="user avatar"/></div>
        <div className={s.description}>
          <div className={s.rate}>
            <div>
              <span style={{marginRight: '15px', fontSize: '15px'}}>
                {author.name}
              </span>
              <span style={{opacity: '.7', fontSize: '15px'}}>
                {time}
              </span>
            </div>
            <div className={s.rating}>
              <Rating rating={rating} />
            </div>
          </div>
          <p>{text}</p>
          {isYours ? <span onClick={deleteHandler} className={s.deleteIcon}>
            <FontAwesomeIcon icon={faTrashCan}/>
          </span> : null}
        </div>
      </div>
    </>
  )
}