import axios from 'axios';

function UpdateUser(nom, prenom, email) {
  return axios.put("http://localhost:3000/api/users/${id}", {
    nom,
    prenom,
    email,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default {
  UpdateUser,
};
