import { response } from "express";
import config from "../config/config.js";

// Récupérer tous les utilisateurs (admin)
export const getAllUsers = async () => {
    // requête SQL pour sélectionner tous les utilisateurs
  const selectAllUsers = "SELECT id, nom, prenom, email, role, created_at FROM users";
  // exécution de la requête et récupération de la réponse
  const [response] = await config.query(selectAllUsers);
  // retour de la réponse
  return response;
};



// Récupérer un utilisateur par son id
export const getUserById = async (id) => {
    // requête SQL pour sélectionner un utilisateur par son id
  const selectUserById = "SELECT id, nom, prenom, email, role, created_at FROM users WHERE id = ?";
  // exécution de la requête avec l'id en paramètre et récupération de la réponse
  const [rows] = await config.query(selectUserById, [id]); //rows car j'ai eu un tableau vide avec result
  // retour de la réponse
  return rows;
};



//  récupérer un utilisateur par son id pour le modifier
export const updateUsers = async (nom, prenom, email, id) => {
    // requête SQL pour sélection un utilisateur par son id et modifier son nom, som prénom et son email
  const updateUser = `
    UPDATE users
    SET nom = ?, prenom = ?, email = ?
    WHERE id = ?
  `;
    // éxecution de la requête avec l'id et récupération de la réponse
  const [result] = await config.query(updateUser, [nom, prenom, email, id]);
  // retour de la réponse
  return result;
};



// récupérer un utilisateur par son id pour supprimer un utilisateur
export const deleteUser = async (id) => {
    // requête sql pour sélectionner un utilisateur par son id et le supprimer
  const deleteUser = "DELETE FROM users WHERE id = ?";
  // retour de la réponse de la suppression de données
  return config.query(deleteUser, [id]);
}


//prendre en compte nom, prenom, email et mdp pour la cration du user
export const createUser = async (nom, prenom, email, password) => {
  // requête sql pour créer un user
  const createUser = `
  INSERT INTO users (nom, prenom, email, password)
  VALUES (?, ?, ?, ?)
  `;
  // retour du résultat
  const[result] = await config.query(createUser, [nom, prenom, email, password]);
  return  result;
};

//Trouver un utilisateur par mail pour le login
export const findUserByEmail = async (email) => {
  //requête sql pour trouver le user avec le mail
  const findUserByEmail = `
  SELECT * FROM users WHERE email = ?
  `;
  // retour de la réponse avec rows car sinon tableau vide []
  const [rows] = await config.query(findUserByEmail, [email]);
  return rows; 
}


