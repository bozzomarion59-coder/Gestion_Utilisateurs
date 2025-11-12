import NavBar from "../Composants/NavBar";


function Accueil() {
  return (
    <>
      <NavBar />
      <div style={{
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
        color: '#003366',
        lineHeight: '1.6'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>À propos du projet</h2>
        <p>
          Ce projet de gestion d’utilisateurs a été développé dans le cadre d’un cahier des charges précis,
          en utilisant Node.js, Express et MySQL. La partie backend de l’application qui inclue la structure de la base de données,
          les routes API, ainsi que la logique d’authentification et de gestion des utilisateurs, a été entièrement conçue et réalisée par moi-même.
          L’application permet aux utilisateurs de s’inscrire, se connecter, modifier ou supprimer leur compte, tout en offrant une interface d’administration dédiée à la gestion des profils.
        </p>
        <p>
          Grâce à une API REST, le frontend interagit efficacement avec le backend pour assurer une expérience fluide.
          Les rôles sont clairement définis entre utilisateurs standards et administrateurs, garantissant une gestion sécurisée et structurée des accès.
        </p>
      </div>

    </>
  );
}


export default Accueil;

