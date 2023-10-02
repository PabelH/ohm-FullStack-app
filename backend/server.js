import dotenv from 'dotenv'; 
import express, { json } from 'express';
import { mongoose, Schema, model } from 'mongoose';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

// Conectar a la base de datos MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI; // Reemplaza con tu URL de conexión
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB Atlas establecida'))
  .catch(err => console.error(err));

// Definir modelo de datos para el Multiplicador y Tolerancia

const resistorSchema = new Schema({
  color: String,
  value: Number,
  multiplier: Number,
  tolerance: Number,
});

const Resistor = model('Resistor', resistorSchema);

// Definir la ruta para calcular el valor de la resistencia
app.post('/api/calculate', async (req, res) => {
  try {
    const { bandAColor, bandBColor, bandCColor, bandDColor } = req.body;
    const bandA = await Resistor.findOne({ color: bandAColor });
    const bandB = await Resistor.findOne({ color: bandBColor });
    const bandC = await Resistor.findOne({ color: bandCColor });
    const bandD = await Resistor.findOne({ color: bandDColor });

    if (bandA && bandB && bandC && bandD) {
      const resistance = Number(`${bandA.value}${bandB.value}`) * bandC.multiplier;
      res.json({ resistance, tolerance: bandD.tolerance });
    } else {
      res.status(400).json({ message: 'Colores de banda no válidos' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
