const serverURL = "http://bac-backend.herokuapp.com/v1/"

// const serverURL = "http://localhost:51119/v1/"

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
    return request('post', 'drinktyped', {drinktyped: drinkTyped})
  },

  drinkSearch(param, searchBy) {
    console.log(param);
    return request('post', 'drinksearch', {
      param: param,
      searchby: searchBy
    })
  },

  ingredientTyped(ingredientTyped) {
    return request('post', 'ingredientsearch', {ingredienttyped: ingredientTyped})
  },
  categoryTyped(categoryTyped) {
    return request('post', 'categorysearch', {categorysearch: categoryTyped})
  },
  glassTyped(glassTyped) {
    return request('post', 'glasssearch', {glasssearch: glassTyped})
  },
  addDrink(drinkName, category, glass) {
    return request('post', 'adddrink', {
      drinkname: drinkName,
      catetory: category,
      glass: glass
    })
  },
  addIngredient(drinkName, ingredientName) {
    return request('post', 'addingredient', {
      drinkname: drinkName,
      ingredientname: ingredientName
    })
  },
  likeADrink(userName, drinkName) {
    return request('post', 'like', {
      username: userName,
      drinkname: drinkName
    })
  },
  unlikeADrink(userName, drinkName) {
    return request('post', 'unlike', {
      username: userName,
      drinkname: drinkName
    })
  },
  randomDrinks() {
    return request('get', 'random');
  },
  clusterCenters(userName) {
    return request('post', 'clustercenter', {
      username: userName
    })
  },
  createDrink(userName) {
    return request('post', 'createdrink', {
      username: userName
    })
  },
  similarDrink(userName, drinkName) {
    return request('post', 'username', 'drinkname'), {
      username: userName,
      drinkname: drinkName
    }
  },
  getLikedDrink(userName) {
    return request('post', 'likedrink', {
      username: userName,
    })
  },
  getIngredient(drinkName) {
    return request('post', 'getingredient', {
      drinktyped:drinkName,
    })
  },

  searchDrinkByIngredient(ingredientNames) {
    return request('post', 'searchdrinkbyingredient', {
      ingredientnames: ingredientNames,
    })
  },
}

export default API
