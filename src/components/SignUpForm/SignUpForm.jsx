import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

import { Loader } from '../Loader/Loader';
import signInStyles from '../SignInForm/SignInForm.module.css'


export function SignUpForm() {
  
  const navigate = useNavigate()
  const {mutateAsync, isLoading, isError, error} = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => {
      if (res.status === 409) {throw new Error('Пользователь с данным email уже существует')}
      if (res.status === 400) {throw new Error('Некорректно заполнено одно из полей')}
      return res.json()
    })
  })

  const submitHadler = async (values) => {
    await mutateAsync(values)
    navigate('/signin')
  }

  const SignUpValidationSchema = object({
    email: string()
      .email('Некорректный email')
      .required('Необходимо ввести email'),
    group: string().oneOf(['sm9'], 'Возможно вы имели в виду sm9?'),
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
          group: 'sm9',
          password: ''}}
        validationSchema={SignUpValidationSchema}
        onSubmit={submitHadler}
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
                  {[signInStyles['text-field__input_invalid']]: errors.group && touched.group })} 
                name="group" 
                type="text" 
                placeholder="Группа" 
                id="group">
              </Field>
              <label className={classNames(`${signInStyles['text-field__label']}`)} htmlFor="group">Группа</label>
              <ErrorMessage component="span" 
                className={classNames(`${signInStyles['text-field__message']}`)} name="group" />
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

            <button disabled={isLoading} type="submit">Зарегистрироваться</button>
          </Form>
        )}
      </Formik>
      <ShowErrorMessage />
    </div>
  )
}