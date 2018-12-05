var axios = require('axios');
let apiHost = `http://${process.env.API_HOST || 'localhost'}:3000`;

module.exports = {
  authenticateUser: (email, password) => {
    let data = {
      auth: {
        email: email,
        password: password
      }
    }
    return axios.post(apiHost + '/api/user/token', data)
      .then((response) => response.data.jwt)
      .catch((error) => undefined)
  },
  getCurrentUser: (jwt) => {
    var config = {
      headers: {}
    }
    if (jwt) {
      config['headers']['Authorization'] = `Bearer ${jwt}`
    }
    return axios.get(apiHost + '/api/users/current', config)
      .then((response) => response.data)
      .catch((error) => console.log(error))
  },
  getPages: () => {
    return axios.get(apiHost + '/api/pages')
      .then((response) => response.data)
      .catch((error) => console.log(error))
  },
  getPage: (jwt, id) => {
    var config = {
      headers: {}
    }
    if (jwt) {
      config['headers']['Authorization'] = `Bearer ${jwt}`
    }
    return axios.get(apiHost + '/api/pages/' + id, config)
      .then((response) => response.data)
      .catch((error) => console.log(error))
  }
} // end module.exports
