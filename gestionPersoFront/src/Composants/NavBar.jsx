import { Link, useNavigate } from 'react-router-dom';



function NavBar() {
  const navigate = useNavigate();

  // bouton pour se déconnecter
  const deconnexion = () => {
     localStorage.removeItem("user"); // l'utilisateur est bien oublié après la déconnexion
    navigate("/connexion", { state: { message: "Déconnexion réussie." } }); // déconnexion et redirige vers la page de connexion
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#0056b3' }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">Gestion</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Inscription">Inscription</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Connexion">Connexion</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/TableauDeBord">Tableau de Bord</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Administrateur">Partie administrateur</Link>
            </li>
          </ul>
          <button
            onClick={deconnexion}
            style={{
              backgroundColor: 'white',
              color: '#007bff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
