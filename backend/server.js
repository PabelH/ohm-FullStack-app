import dotenv from 'dotenv';
import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

// Conectar a la base de datos MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI; 
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB Atlas establecida'))
  .catch(err => console.error(err));

// Definir modelo de datos para el Multiplicador
const multiplierSchema = new mongoose.Schema({
  color: String,
  value: Number,
});

const Multiplier = mongoose.model('Multiplier', multiplierSchema);

// Definir modelo de datos para la Tolerancia
const toleranceSchema = new mongoose.Schema({
  color: String,
  value: Number,
});

const Tolerance = mongoose.model('Tolerance', toleranceSchema);

// Ruta para cargar las opciones de multiplicador en la base de datos
app.post('/api/upload-multiplier-options', async (req, res) => {
  try {
    const { multiplierOptions } = req.body;
    const result = await Multiplier.create(multiplierOptions);
    res.json({ message: 'Opciones de multiplicador cargadas exitosamente', result });
  } catch (error) {
    console.error('Error al cargar las opciones de multiplicador:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Ruta para cargar las opciones de tolerancia en la base de datos
app.post('/api/upload-tolerance-options', async (req, res) => {
  try {
    const { toleranceOptions } = req.body;
    const result = await Tolerance.create(toleranceOptions);
    res.json({ message: 'Opciones de tolerancia cargadas exitosamente', result });
  } catch (error) {
    console.error('Error al cargar las opciones de tolerancia:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Ruta para obtener las opciones de multiplicador desde la base de datos
app.get('/api/multiplier-options', async (req, res) => {
  try {
    const multiplierOptions = await Multiplier.find({});
    res.json(multiplierOptions);
  } catch (error) {
    console.error('Error al obtener las opciones de multiplicador:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Ruta para obtener las opciones de tolerancia desde la base de datos
app.get('/api/tolerance-options', async (req, res) => {
  try {
    const toleranceOptions = await Tolerance.find({});
    res.json(toleranceOptions);
  } catch (error) {
    console.error('Error al obtener las opciones de tolerancia:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
