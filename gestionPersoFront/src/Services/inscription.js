import axios from 'axios';

function CreateUser(nom, prenom, email, password) {
    return axios.post("http://localhost:3000/api/users/Inscription", {
        nom,
        prenom,
        email,
        password,
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export default {
    CreateUser,
}