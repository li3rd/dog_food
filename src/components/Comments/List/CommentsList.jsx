import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { dfApi } from '../../../api/DogFoodApi';
import { getUserToken } from '../../../store/slices/user.slice';
import { withQuery } from '../../HOCs/witQuery';
import { Loader } from '../../Loader/Loader';
import { CommentForm } from '../Form/CommentForm';

import { CommentItem } from '../Item/CommentItem';

import s from './CommentsList.module.css'


function CommentsListInner ({comments}) {

  return (
    <div className={s.container}>
      <CommentForm />
      {comments.map(({_id: id, ...commentItem}) => (
        <CommentItem key={id} id={id} {...commentItem}/>))}
    </div>
  )
}

const CommentsListWithQuery = withQuery(CommentsListInner)


export function CommentsList() {
  const token = useSelector(getUserToken)
  const {productId} = useParams()



  const {data, isLoading, refetch, isError, error} = useQuery({
    queryKey: ['comments', productId],
    queryFn: () => dfApi.getCommentsById(productId, token)
  })

  if (isLoading) return <Loader />

  let comments = [...data].reverse()

  return <CommentsListWithQuery
    isLoading={isLoading}
    isError={isError}
    refetch={refetch}
    error={error}
    comments={comments} />
}