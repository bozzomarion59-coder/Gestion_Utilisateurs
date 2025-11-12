import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './Pages/Accueil';
import Inscription from './Pages/Inscription';
import Connexion from './Pages/Connexion';
import TableauDeBord from './Pages/TableauDeBord';
import Administrateur from './Pages/Administrateur';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/TableauDeBord" element={<TableauDeBord />} />
        <Route path="/Administrateur" element={<Administrateur />} />
      </Routes>
    </Router>
  );
}

export default App;
