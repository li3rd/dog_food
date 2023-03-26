

class DogFoodApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl
  }

  getAuthorizationToken(token) {
    return `Bearer ${token}`
  }

  async signUp(data) {
    const res = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.status === 409) {throw new Error('Пользователь с данным email уже существует')}
    if (res.status === 400) {throw new Error('Некорректно заполнено одно из полей')}
    return res.json()
  }

  async signIn(data) {
    const res = await fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.status === 401) {throw new Error('Не правильные логин или пароль')}
    if (res.status === 404) {throw new Error('Пользователь с email не найден')}
    if (res.status === 400) {throw new Error('Некорректный запрос')}
    return res.json()
  }

  getProductsByIds(ids, token) {
    return Promise.all(ids.map((id) => fetch(`${this.baseUrl}/products/${id}`, {
      headers: {
        authorization: this.getAuthorizationToken(token),
      },
    }).then((res) => {
      if (res.status === 404) return ({_id: res.url.slice(-24)})
      return res.json()})))
  }

  async getAllProducts(search, token) {
    const res = await fetch(`${this.baseUrl}/products/search?query=${search}`, {
      headers: {
        authorization: this.getAuthorizationToken(token),
      },
    })
    if (res.status >= 400) {
      throw new Error(`${res.status}: Произошла ошибка. Попробуйте сделать запрос позже.`)
    }
    return res.json()
  }

  async getProductById(id, token) {
    const res = await fetch(`${this.baseUrl}/products/${id}`, {
      headers: {
        authorization: this.getAuthorizationToken(token),
      },
    })
    if (res.status === 401) {throw new Error('Необходима авторизация')}
    if (res.status === 500) {throw new Error('На сервере произошла ошибка')}
    return res.json()
  }

  async getCommentsById (id, token) {
    const res = await fetch(`${this.baseUrl}/products/review/${id}`, {
      headers: {
        authorization: this.getAuthorizationToken(token),
      },
    })
    return res.json() 
  }

  async postCommentById(data, id, token) {
    const res = await fetch(`https://api.react-learning.ru/products/review/${id}`, {
      method: 'POST',
      headers: {
        authorization: this.getAuthorizationToken(token),
        'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    if (res.status === 400) {throw new Error('Напишите комментарий')}
    return res.json()
  }

  async deleteCommentById(id, reviewId, token) {
    const res = await fetch(`https://api.react-learning.ru/products/review/${id}/${reviewId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.getAuthorizationToken(token)
      }})
    return res.json()
  }

  async addProduct(data, token) {
    const res = await fetch(`${this.baseUrl}/products`, {
      method: 'POST',
      headers: {
        authorization: this.getAuthorizationToken(token),
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return res.json()
  }

  async editProduct(data, id, token) {
    const res = await fetch(`${this.baseUrl}/products/${id}`, {
      method: 'PATCH',
      headers: {
        authorization: this.getAuthorizationToken(token),
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return res.json()
  }

  async deleteProductById(id, token) {
    const res = await fetch(`https://api.react-learning.ru/products/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.getAuthorizationToken(token)
      }})
    return res.json()
  }
}



export const dfApi = new DogFoodApi({ baseUrl: 'https://api.react-learning.ru' })
