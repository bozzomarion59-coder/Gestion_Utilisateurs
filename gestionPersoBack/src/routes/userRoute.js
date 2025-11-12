import express from "express";

import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser,
    loginUser,
} from "../controllers/userController.js";


const router = express.Router();

//Tous les utilisateurs (admin)
router.get("/", getAllUsers);

//Un utilisateur par son id
router.get("/:id", getUserById);

//Modifier un utilisateur
router.put("/:id", updateUser);

//Supprimer un utilisateur
router.delete("/:id", deleteUser);

//Créer un utilisateur 
router.post("/Inscription", createUser);

//login pour utilisateur
router.post("/Connexion", loginUser);

export default router;