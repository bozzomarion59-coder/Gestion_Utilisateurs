import { useState, useEffect } from "react";
import NavBar from "../Composants/NavBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";



function TableauDeBord() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user")); // permet de rester connecté même après un refresh ou clic (ia car bloquéé)
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');



  // vérification si personne connectée, sinon bloquer accès aux personnes non connectées et redirection vers connexion
  useEffect(() => {
    if (!user) {
      navigate("/connexion", { state: { message: "Accès refusé. Veuillez vous connecter." } });
    }
  }, [user, navigate]);

  // bouton modification 
  const Modification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/users/${user.id}`, {
        nom,
        prenom,
        email,
      });
      setMessage("Informations modifiées avec succès !");
    } catch (error) {
      setMessage("Erreur lors de la modification");
    }
  };

  //bouton supprimé
  const SupprimerMonCompte = async () => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?");
    if (!confirmation) return;

    try {
      await axios.delete(`http://localhost:3000/api/users/${user.id}`);
      localStorage.removeItem("user"); // déconnecte l'utilisateur
      alert("Votre compte a été supprimé.");
      navigate("/"); // redirige vers la page d’accueil
    } catch (error) {
      console.error("Erreur lors de la suppression du compte :", error);
    }
  };


  return (
    <>
      <NavBar />
      <div style={{
        backgroundImage: 'url("https://img.freepik.com/vecteurs-libre/fond-bleu-clair-aquarelle_78370-3537.jpg?semt=ais_hybrid&w=740&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '150px auto',
          padding: '5rem',
          border: '2px solid #ccc',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
          fontFamily: 'Arial, sans-serif'
        }}>
          <h2 style={{ textAlign: 'center' }}>Tableau de bord</h2>
          <form onSubmit={Modification}>
            <div style={{ marginBottom: '1rem' }}>
              <label>Nom :</label><br />
              <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} /><br /><br />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Prénom :</label><br />
              <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} /><br /><br />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Email :</label><br />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
            </div>
            <button type="submit"
              style={{
                width: '50%',
                padding: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }} >Modifier mes infos</button>
            <button onClick={SupprimerMonCompte}
              style={{
                width: '50%',
                padding: '10px',
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: 'pointer'
              }}>Supprimer mon compte</button>
          </form>
          {message}
        </div>
      </div>
    </>
  );
}

export default TableauDeBord;
