import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik} from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

import { dfApi } from '../../api/DogFoodApi';
import { cartInitialize } from '../../store/slices/cart.slice';
import { favoriteInitialize } from '../../store/slices/favorite.slice';
import { logIn } from '../../store/slices/user.slice';
import { Loader } from '../Loader/Loader';

import signInStyles from './SignInForm.module.css'


export function SignInForm() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {mutateAsync, isLoading, isError, error} = useMutation({
    mutationFn: (data) => dfApi.signIn(data).then(result => {
      if (result.token) {
        dispatch(cartInitialize(result))
        dispatch(favoriteInitialize(result))
        dispatch(logIn(result))
        setTimeout(() => {navigate('/products')})
      } return result
    })
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
  }

  const SignInValidationSchema = object({
    email: string()
      .email('Некорректный email')
      .required('Необходимо ввести email'),
    password: string()
      .min( 4, 'Не менее 4 символов')
      .required('Необходимо ввести пароль')
  })
  
  const ShowErrorMessage = () => {
    if (isLoading) return <Loader />
    if (isError) {
      return (
        <p>{error.message}</p>
      )
    } return null
  }
  

  return (
    <div className={signInStyles.container}>
      <Formik 
        initialValues={{
          email: '',
          password: ''}}
        validationSchema={SignInValidationSchema}
        onSubmit={submitHandler}
      >
        {({errors, touched}) => (
          <Form className={signInStyles.form}>
            <div className={classNames(`${signInStyles['text-field']}`, `${signInStyles['text-field_floating']}`)}>
              <Field 
                className={classNames(`${signInStyles['text-field__input']}`, 
                  {[signInStyles['text-field__input_invalid']]: errors.email && touched.email })} 
                name="email" 
                type="email" 
                placeholder="Email" 
                id="email">
              </Field>
              <label className={classNames(`${signInStyles['text-field__label']}`)} htmlFor="email">Email</label>
              <ErrorMessage component="span" 
                className={classNames(`${signInStyles['text-field__message']}`)} name="email" />
            </div>
            <div className={classNames(`${signInStyles['text-field']}`, `${signInStyles['text-field_floating']}`)}>
              <Field 
                className={classNames(`${signInStyles['text-field__input']}`, 
                  {[signInStyles['text-field__input_invalid']]: errors.password && touched.password})}
                name="password" 
                placeholder="Пароль" 
                type="password" 
                id="password">
              </Field>
              <label className={classNames(`${signInStyles['text-field__label']}`)} htmlFor="password">Пароль</label>
              <ErrorMessage component="span" 
                className={classNames(`${signInStyles['text-field__message']}`)} name="password" />
            </div>

            <button disabled={isLoading} type="submit">Войти</button>
          </Form>
        )}
      </Formik>
      <div className={signInStyles.redirect}>
        <span>или</span>
        <Link to={'/signup'}>Зарегистрироваться</Link>
      </div>
      <ShowErrorMessage />
    </div>
  )
}