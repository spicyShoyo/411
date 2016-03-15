const serverURL = "http://bac-backend.herokuapp.com/v1/"

let request = (method, key, body) => {
  return fetch(serverURL + key, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
}

let API = {
  signupRequest(username, password) {
    return request('post', 'register', {
      username: username,
      password: password
    })
  },
  loginRequest(username, password) {
    return request('post', 'login', {
      username: username,
      password: password
    })
  },
  drinkTyped(drinkTyped) {
    return request('post', 'drinktyped', {
        drinktyped:drinkTyped
    })
  },
  ingredientTyped(ingredientTyped) {
    return request('post', 'ingredienttyped', {
        ingredienttyped:ingredientTyped
    })
  },
  addDrink(drinkName, ingredientName, category, glass) {
    return request('post', 'adddrink', {
        drinkname: drinkName,
        ingredientname: ingredientName,
        catetory: category,
        glass: glass
    })
},
  random() {
      return request('get', 'random');
  },
}

export default API
