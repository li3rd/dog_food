import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Field, Formik, Form } from 'formik'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { object, string } from 'yup';

import { dfApi } from '../../../api/DogFoodApi';
import { getUserToken } from '../../../store/slices/user.slice';
import { Rating } from '../Rating/Rating';

import s from './CommentForm.module.css'


export function CommentForm () {

  const token = useSelector(getUserToken)
  const {productId} = useParams()
  const queryClient = useQueryClient()

  const {mutateAsync} = useMutation({
    mutationFn: (data) => dfApi.postCommentById(data, productId, token)
  })

  const submitHandler = async (values, actions) => {
    await mutateAsync(values)
    await queryClient.refetchQueries()
    actions.resetForm()
  }
  const commentValidationSchema = object({
    text: string().required('Напишите комментарий')
  })

  return (
    <div className={s.wrapper}>
      <Formik
        initialValues={{
          text: '',
          rating: 5
        }}
        validationSchema={commentValidationSchema}
        onSubmit={(values, actions) => submitHandler(values, actions)}>
        <Form className={s.form}>
          <Field 
            name="rating"
            component={Rating}
          />
          <Field
            name="text"
            as="textarea"
            placeholder="Ваш комментарий">
          </Field>
          <button type="submit">send</button>
        </Form>
      </Formik>
    </div>
  )
}