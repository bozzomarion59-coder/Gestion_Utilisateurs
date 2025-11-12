import { useState } from "react";
import NavBar from "../Composants/NavBar";
import inscription from "../Services/inscription";
import { useNavigate } from "react-router-dom";


function Inscription() {
    // déclarer mes états pour les champs du formulaire à remplir par l'utilisateur
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await inscription.CreateUser(nom, prenom, email, motDePasse);
            setMessage("Inscription réussie !");
            setNom('');
            setPrenom('');
            setEmail('');
            setMotDePasse('');
            setTimeout(() => navigate('/connexion'), 2000); // 2 secondes avant redirection vers page connexion 
        } catch (error) {
            if (error) {
                setMessage("Erreur");
            } else {
                setMessage("Erreur lors de l’inscription");
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
                    <h2 style={{ textAlign: 'center' }}>Page d'inscription</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Nom :</label><br />
                            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Prénom :</label><br />
                            <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                        </div>
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
                            }} >S’inscrire</button>
                    </form>
                    {message && ( //message de réussite dès que le user clique dur inscription
                        <div>
                            {message}
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}

export default Inscription;
