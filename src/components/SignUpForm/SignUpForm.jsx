import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string } from 'yup';

import { AuthNavBar } from '../AuthNavBar/AuthNavBar';

export function SignUpForm() {
  
  

  const SignUpValidationSchema = object({
    email: string()
      .email('Некорректный email')
      .required('Необходимо ввести email'),
    group: string().oneOf(['sm9'], 'Возможно вы имели в виду sm9?'),
    password: string()
      .min( 4, 'Не менее 4 символов')
      .required('Необходимо ввести пароль')
  })

  return (
    <div>
      <AuthNavBar />
      <Formik 
        initialValues={{
          email: '',
          group: 'sm9',
          password: ''}}
        validationSchema={SignUpValidationSchema}
        onSubmit={values => console.log({values})}
      >
        <Form>
          <Field name="email" type="email" placeholder="Email"></Field>
          <ErrorMessage component="span" className="error" name="email" />

          <Field name="group" type="text" placeholder="Группа"></Field>
          <ErrorMessage component="span" className="error" name="group" />

          <Field name="password" placeholder="Пароль" type="password"></Field>
          <ErrorMessage component="span" className="error" name="password" />

          <button type="submit">Войти</button>
        </Form>
      </Formik>
    </div>
  )
}