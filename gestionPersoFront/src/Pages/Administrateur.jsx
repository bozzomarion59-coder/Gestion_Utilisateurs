import { useEffect, useState } from "react";
import NavBar from "../Composants/NavBar";
import administrateur from "../Services/administrateur";
import { useNavigate } from "react-router-dom";


function Administrateur() {
  const [utilisateurs, setUtilisateurs] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")); // vérifier le role du user
  const navigate = useNavigate();
  // si role non admin redirection vers page connexion
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/connexion", {
        state: { message: "Accès refusé. Réservé aux administrateurs." }
      });
    }
  }, [user, navigate]);



  const Supprimer = async (id) => { // je reçois l'identifiant que je veux supp
    const confirmation = window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?"); // on me demande la confirmation
    if (!confirmation) return; // si "non" ça s'arrête

    try {
      await administrateur.deleteUser(id); // si on confirme, on envoie une dde au serveur pour supp le user dans la BDD
      setUtilisateurs(utilisateurs.filter(user => user.id !== id)); // une fois supp on met à jour l'écran et on garde les users non supprimés
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };


  useEffect(() => { // quand la page s'ouvre il faut qu'elle fasse ceci :
    const fetchUsers = async () => { // fonction pour chercher les users
      try {
        const response = await administrateur.getAllUsers(); // je demande au serveur de me donner les users
        setUtilisateurs(response.data); // une fois la reception de la response, le tableau se rempli
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
      }
    };

    fetchUsers();
  }, []); // se fait une seule fois au démarrage pour ça que j'ai mis des []

  return (
    <>
      <NavBar />
      <div style={{ padding: '2rem' }}>
        <h2 style={{ textAlign: 'center', margin: '1rem' }}>Page de l’administrateur</h2>
        <p style={{ textAlign: 'center' }}>Liste des utilisateurs créés :</p>
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {utilisateurs.map((user) => (
              <tr key={user.id}>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => Supprimer(user.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Administrateur;
