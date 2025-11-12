import axios from 'axios';

function loginUser(email, password) {
  return axios.post("http://localhost:3000/api/users/Connexion", {
    email,
    password,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default {
  loginUser,
};
