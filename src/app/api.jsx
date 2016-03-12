<<<<<<< 31ee9ea241d636e7be45c8e8f048721f28337dc6
const serverURL = "http://172.17.87.138:51119/v1/"
=======
const serverURL = "http://bac-backend.herokuapp.com/v1/"
>>>>>>> Added Navbar and changed to event emitter pattern

let instance = null;

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
  }
}

export default API
