// import mysql2 module
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// creation de la connexion à la base de données
const config = await mysql.createConnection({
    //parametre de connexion
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASENAME,
    port: process.env.DB_PORT
});

// test de la connexion
config.connect((error) => {
  if (err) {
    console.error("Erreur de connexion à MySQL :", error);
    return;
  }
  console.log("Connecté à la base de données MySQL !");
});

// exportation de la connexion
export default config;