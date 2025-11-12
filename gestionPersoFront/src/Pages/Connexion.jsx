import { useState } from "react";
import NavBar from "../Composants/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import connexion from "../Services/connexion";


function Connexion() {
    // déclarer mes états pour les champs du formulaire à remplir par l'utilisateur
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || ''); // permet d'afficher le message "déconnexion réussie" ou "accès refusé" selon la situation
    const navigate = useNavigate();

    // bouton se connecter
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await connexion.loginUser(email, motDePasse);
            setMessage(`Bienvenue!`);
            localStorage.setItem("user", JSON.stringify(response.data.user)); // stocker l'utilisateur, j'ai demandé à l'ia car je bloquais
            navigate('/TableauDeBord');
        } catch (error) {
            if (error) {
                setMessage(`Erreur`);
            } else {
                setMessage("Erreur lors de la connexion");
            }
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
                    <h2 style={{ textAlign: 'center' }}>Page de Connexion</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Email :</label><br />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Mot de passe :</label><br />
                            <input type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required />
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
                            }} >Se connecter</button>
                    </form>
                    {message && <p>{message}</p>}
                    
                </div>
            </div>
        </>
    );
}

export default Connexion;

