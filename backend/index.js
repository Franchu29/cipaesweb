import express from 'express';
import cors from 'cors';
import { getConnection } from './db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*', // luego lo restringimos con Nginx
}));
app.use(express.json());

// Conexión a la base de datos
(async () => {
  try {
    await getConnection();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (err) {
    console.error('No se pudo conectar a la base de datos:', err);
    process.exit(1);
  }
})();

// Rutas
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
