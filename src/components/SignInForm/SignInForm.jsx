import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string } from 'yup';

import { AuthNavBar } from '../AuthNavBar/AuthNavBar';




export function SignInForm() {


  const SignInValidationSchema = object({
    email: string()
      .email('Некорректный email')
      .required('Необходимо ввести email'),
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
          password: ''}}
        validationSchema={SignInValidationSchema}
        onSubmit={values => console.log({values})}
      >
        <Form>
          <Field name="email" type="email" placeholder="Email"></Field>
          <ErrorMessage component="span" className="error" name="email" />

          <Field name="password" placeholder="Пароль" type="password"></Field>
          <ErrorMessage component="span" className="error" name="password" />

          <button type="submit">Войти</button>
        </Form>
      </Formik>
    </div>
  )
}