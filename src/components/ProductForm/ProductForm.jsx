import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { boolean, number, object, string } from 'yup';

import { dfApi } from '../../api/DogFoodApi';
import { getUserToken } from '../../store/slices/user.slice';

import s from './ProductForm.module.css'

export function ProductForm({ _id: id, name, stock, price, pictures, 
  discount, wight, description, available, closeHandler}) {
  const token = useSelector(getUserToken)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  

  const {mutateAsync, isLoading, isError, error} = useMutation({
    mutationFn: (data) => dfApi.addProduct(data, token)
      .then(result => {
        if (result.author) {
          setTimeout(() => {navigate(`/products/${result._id}`)})
        } return result
      })
  })

  const {mutateAsync: mutateAsyncEdit, isLoading: isLoadingEdit, isError: isErrorEdit, error: errorEdit} = useMutation({
    mutationFn: (data) => dfApi.editProduct(data, id, token)
  })
  

  const editSubmitHandler = async (values) => {
    await mutateAsyncEdit(values)
    await queryClient.refetchQueries({ queryKey: [`${id}`], type: 'active' })
    closeHandler()
  }


  const submitHadler = async (values) => {
    await mutateAsync(values)
    await queryClient.refetchQueries({ queryKey: ['productsFetch'], type: 'active' })
    closeHandler()
  };
  
  const initValues = {
    available: id ? available : true, // boolean
    pictures: pictures || '', // string
    name: name || '', // string, обязательное
    price: price || '', // number, обязательное
    discount: discount || '', // number 
    stock: stock || '', // number
    wight: wight || '', // string
    description: description || '', // string, обязательное
  }
  
  const productFormValidationSchema = object({
    available: boolean(),
    pictures: string()
      .trim()
      .matches(
        // eslint-disable-next-line max-len
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Invalid url address!')
      .required('Необходимо указать url для изображения'), 
    name: string()
      .trim()
      .required('Необходимо ввести наименование товара'),
    price: number()
      .integer('Только целое число')
      .positive('Должно быть больше 0')
      .required('Необходимо указать цену товара'),
    discount: number()
      .integer('Только целое число')
      .positive('Должно быть больше 0'),
    stock: number()
      .integer('Только целое число')
      .positive('Должно быть больше 0'),
    wight: string()
      .trim()
      .required('Необходимо указать вес товара'),
    description: string()
      .trim()
      .required('Необходимо указать описание товара')
  });



  return (
    <div className={s.container}>
      <Formik
        initialValues={initValues}
        validationSchema={productFormValidationSchema}
        onSubmit={id ? editSubmitHandler : submitHadler}
      >
        {({ errors, touched }) => (
          <Form className={s.form}>
            <div
              className={classNames(
                `${s['text-field']}`,
                `${s['text-field_floating']}`
              )}
            >
              <Field
                className={classNames(`${s['text-field__input']}`, {
                  [s['text-field__input_invalid']]:
                    errors.name && touched.name,
                })}
                name="name"
                type="text"
                placeholder="Наименование товара"
                id="name"
              ></Field>
              <label
                className={classNames(`${s['text-field__label']}`)}
                htmlFor="name"
              >
                Наименование товара
              </label>
              <ErrorMessage
                component="span"
                className={classNames(`${s['text-field__message']}`)}
                name="name"
              />
            </div>
            <div
              className={classNames(
                `${s['text-field']}`,
                `${s['text-field_floating']}`
              )}
            >
              <Field
                className={classNames(`${s['text-field__input']}`, {
                  [s['text-field__input_invalid']]:
                    errors.description && touched.description,
                })}
                name="description"
                placeholder="Описание товара"
                type="text"
                id="description"
              ></Field>
              <label
                className={classNames(`${s['text-field__label']}`)}
                htmlFor="description"
              >
                Описание товара
              </label>
              <ErrorMessage
                component="span"
                className={classNames(`${s['text-field__message']}`)}
                name="description"
              />
            </div>
            <div
              className={classNames(
                `${s['text-field']}`,
                `${s['text-field_floating']}`
              )}
            >
              <Field
                className={classNames(`${s['text-field__input']}`, {
                  [s['text-field__input_invalid']]:
                    errors.pictures && touched.pictures,
                })}
                name="pictures"
                type="text"
                placeholder="Изображение товара"
                id="pictures"
              ></Field>
              <label
                className={classNames(`${s['text-field__label']}`)}
                htmlFor="pictures"
              >
                Изображение товара
              </label>
              <ErrorMessage
                component="span"
                className={classNames(`${s['text-field__message']}`)}
                name="pictures"
              />
            </div>
            <div
              className={classNames(
                s.withNumber,
                `${s['text-field']}`,
                `${s['text-field_floating']}`
              )}
            >
              <Field
                className={classNames(`${s['text-field__input']}`, {
                  [s['text-field__input_invalid']]:
                    errors.price && touched.price,
                })}
                name="price"
                placeholder="Цена товара"
                type="number"
                id="price"
              ></Field>
              <label
                className={classNames(`${s['text-field__label']}`)}
                htmlFor="price"
              >
                Цена товара
              </label>
              <ErrorMessage
                component="span"
                className={classNames(`${s['text-field__message']}`)}
                name="price"
              />
            </div>
            <div
              className={classNames(
                `${s['text-field']}`,
                `${s['text-field_floating']}`
              )}
            >
              <Field
                className={classNames(`${s['text-field__input']}`, {
                  [s['text-field__input_invalid']]:
                    errors.wight && touched.wight,
                })}
                name="wight"
                placeholder="Вес товара"
                type="text"
                id="wight"
              ></Field>
              <label
                className={classNames(`${s['text-field__label']}`)}
                htmlFor="wight"
              >
                Вес товара
              </label>
              <ErrorMessage
                component="span"
                className={classNames(`${s['text-field__message']}`)}
                name="wight"
              />
            </div>
            <div
              className={classNames(
                s.withNumber,
                `${s['text-field']}`,
                `${s['text-field_floating']}`
              )}
            >
              <Field
                className={classNames(`${s['text-field__input']}`, {
                  [s['text-field__input_invalid']]:
                    errors.discount && touched.discount,
                })}
                name="discount"
                placeholder="Скидка на товар"
                type="number"
                id="discount"
              ></Field>
              <label
                className={classNames(`${s['text-field__label']}`)}
                htmlFor="discount"
              >
                Скидка на товар
              </label>
              <ErrorMessage
                component="span"
                className={classNames(`${s['text-field__message']}`)}
                name="discount"
              />
            </div>
            <div
              className={classNames(
                s.withNumber,
                `${s['text-field']}`,
                `${s['text-field_floating']}`
              )}
            >
              <Field
                className={classNames(`${s['text-field__input']}`, {
                  [s['text-field__input_invalid']]:
                    errors.stock && touched.stock,
                })}
                name="stock"
                placeholder="В наличии"
                type="number"
                id="stock"
              ></Field>
              <label
                className={classNames(`${s['text-field__label']}`)}
                htmlFor="stock"
              >
                В наличии
              </label>
              <ErrorMessage
                component="span"
                className={classNames(`${s['text-field__message']}`)}
                name="stock"
              />
            </div>
            <label style={{margin:' 0 0 1rem 5px'}}>
              <Field name="available"
                type="checkbox"
                style={{marginRight: '10px'}}
              />
              Доступен для продажи
            </label>

            <button disabled={isLoading || isLoadingEdit} type="submit">
              Подтвердить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
