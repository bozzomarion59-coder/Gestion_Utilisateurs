import axios from "axios";

const getAllUsers = () => {
  return axios.get("http://localhost:3000/api/users");
};

const deleteUser = (id) => {
  return axios.delete(`http://localhost:3000/api/users/${id}`);
};

export default {
  getAllUsers,
  deleteUser,
};
