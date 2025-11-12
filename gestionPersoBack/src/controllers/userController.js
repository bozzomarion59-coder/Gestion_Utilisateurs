import * as userModel from '../models/userModel.js';
import bcrypt from "bcrypt";



// Fonction pour récupérer tous les utilisateurs GET
export const getAllUsers = async (req, res) => {
    try {
        // appel du modèle pour récupérer les utilisateurs
        const users = await userModel.getAllUsers();
        // envoie de la réponse avec les utilisateurs récupérés
        res.status(200).json(users);

    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
};

// fonction pour récupérer un utilisateur par son id GET
export const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const userById = await userModel.getUserById(id);
        res.status(200).json(userById);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
    }
};


// fonction pour modifier un utilisateur par son id UPDATE
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { nom, prenom, email } = req.body;
    try {
        // vérifier si l'utilisateur existe avant de le mettre à jour
        const existant = await userModel.getUserById(id);
        console.log(existant)
        if (existant.length === 0) {
            return res.status(404).json({ message: "Utilisateur inconnu" });
        } else {
            // mise à jour de l'utilisateur
            const updateUser = await userModel.updateUsers(nom, prenom, email, id);
            // réponse avec succès
            res.status(200).json({ message: "Utilisateur modifié", updateUser });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
        console.error(error);
    }
};

// fonction pour supprimer un utilisateur DELETE
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        // verifier si utilisateur dans BDD avant suppression
        const existant = await userModel.getUserById(id);
        if (existant.length === 0) {
            return res.status(404).json({ message: "Utilisateur inconnu" });
        } else {
            const deleteUser = await userModel.deleteUser(id); //hasher mdp avec bcrypt pour la sécurité
            res.status(200).json({ message: "Utilisateur supprimé", deleteUser });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

// fonction pour créer un utilisateur POST
export const createUser = async (req, res) => {
    console.log("Reçu :", req.body);
    const { nom, prenom, email, password } = req.body;

    try {
        const existant = await userModel.findUserByEmail(email);

        // Vérifier si un utilisateur existe déjà
        if (existant && existant.length > 0) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        }

        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        await userModel.createUser(nom, prenom, email, hashedPassword);

        // Réponses
        res.status(201).json({ message: "Utilisateur créé" });

        // intercepte l'eereur MySQL quand l'email est déja présent dans la base(dde à IA)
    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};


// fonction pour l'utilisateur qui se login avec son mail
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = await userModel.findUserByEmail(email);
        if (!users || users.length === 0) {
            return res.status(401).json({ message: "Email incorrect" });
        }
        const user = users[0];
        // vérifier si mdp correct et connu, je me suis aidée de l'ia car j'étais bloquée sur cette partie

        // fonction asynchrine qui prend en premier le mdp saisi par l'utilisateur et prend en deuxième le mdp hashé stocké 
        // dans la base mailExistant.password et return true si les deux correspondent sinon false
        const verificationPassword = await bcrypt.compare(password, user.password);
        if (!verificationPassword) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }
        // Réponse en cas de succès
        res.status(200).json({ message: "Connexion réussie", user });
    } catch (error) {
        console.error("erreur de connexion:", error)
        res.status(500).json({ message: "Erreur serveur", error: error.message });;
    }
};
