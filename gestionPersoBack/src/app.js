import express from 'express';
import cors from 'cors';
import "./config/config.js";
import userRoutes from "./routes/userRoute.js";
import 'dotenv/config';

const app = express();
const PORT = 3000;

// middleware pour lire le JSON
app.use(express.json());

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log('Serveur démarré sur le port 3000 🟢');
});
