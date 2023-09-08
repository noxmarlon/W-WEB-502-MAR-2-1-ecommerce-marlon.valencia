import axios from "axios";
import { API_AUTH_URL } from '../../../config'

axios.defaults.withCredentials = true

const register = (email, password, confirmPassword) => {
  return axios.post(API_AUTH_URL + "signup", {
    email,
    password,
    confirmPassword,
  });
};

const login = (email, password) => {
  return axios.post(API_AUTH_URL + "login", {
    email,
    password,
  });
  // .then((response) => {
  //   localStorage.setItem("token", JSON.stringify(response.data.accessToken));
  //   return response.data;
  // })
  // .catch(function (error) {
  //   return error;
  // });
};

const logout = () => {

  const user = JSON.parse(localStorage.getItem("token"));

  var config = {
    method: 'post',
    url: API_AUTH_URL + "logout",
    headers: {
      'x-access-token': user
    }
  };

  return axios(config)
    .then((response) => {
      localStorage.removeItem("token");
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("token"));
};



const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,

}

export default AuthService;