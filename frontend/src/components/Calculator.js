// Calculator.js
import React, { useState, useEffect } from 'react';

function Calculator() {
  const [multiplierOptions, setMultiplierOptions] = useState([]);
  const [toleranceOptions, setToleranceOptions] = useState([]);
  const [selectedMultiplier, setSelectedMultiplier] = useState('');
  const [selectedTolerance, setSelectedTolerance] = useState('');
  const [bandAColor, setBandAColor] = useState('');
  const [bandBColor, setBandBColor] = useState('');
  const [resistanceValue, setResistanceValue] = useState(null);

  useEffect(() => {
    // Obtener las opciones de multiplicador desde el backend
    fetch('/api/multiplier-options') // Reemplaza con la URL correcta de tu servidor
      .then((response) => response.json())
      .then((data) => setMultiplierOptions(data))
      .catch((error) => console.error('Error al obtener opciones de multiplicador:', error));

    // Obtener las opciones de tolerancia desde el backend
    fetch('/api/tolerance-options') // Reemplaza con la URL correcta de tu servidor
      .then((response) => response.json())
      .then((data) => setToleranceOptions(data))
      .catch((error) => console.error('Error al obtener opciones de tolerancia:', error));
  }, []);

  // Define la lista de colores y valores correspondientes para cada banda
  const bandColors = [
    { color: 'black', value: 0 },
    { color: 'brown', value: 1 },
    { color: 'red', value: 2 },
    { color: 'orange', value: 3 },
    { color: 'yellow', value: 4 },
    { color: 'green', value: 5 },
    { color: 'blue', value: 6 },
    { color: 'violet', value: 7 },
    { color: 'gray', value: 8 },
    { color: 'white', value: 9 },
  ];

  // Manejar cambios en los campos del formulario
  const handleMultiplierChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedMultiplier(selectedValue);
  };

  const handleToleranceChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTolerance(selectedValue);
  };

  const handleBandAColorChange = (event) => {
    const selectedColor = event.target.value;
    setBandAColor(selectedColor);
  };

  const handleBandBColorChange = (event) => {
    const selectedColor = event.target.value;
    setBandBColor(selectedColor);
  };

  const handleCalculate = (event) => {
    event.preventDefault();

    // Verifica que todos los valores necesarios estén seleccionados
    if (selectedMultiplier && selectedTolerance && bandAColor && bandBColor) {
      // Encuentra el valor correspondiente en la lista de colores para cada banda
      const bandAValue = bandColors.find((color) => color.color === bandAColor)?.value;
      const bandBValue = bandColors.find((color) => color.color === bandBColor)?.value;

      if (bandAValue !== undefined && bandBValue !== undefined) {
        // Realiza el cálculo de la resistencia
        // Formula de cálculo: Resistance = (BandAValue * 10 + BandBValue) * MultiplierValue
        const calculatedResistance = (bandAValue * 10 + bandBValue) * selectedMultiplier;

        // Establece el valor de la resistencia calculada en el estado
        setResistanceValue(calculatedResistance.toFixed(2)); // Redondea el resultado a 2 decimales
      } else {
        // Muestra un mensaje de error si no se encuentra un valor correspondiente en la lista de colores
        setResistanceValue(null);
        alert('Colores de banda no válidos.');
      }
    } else {
      // Muestra un mensaje de error si no se han seleccionado todos los valores necesarios
      setResistanceValue(null);
      alert('Por favor, selecciona todos los valores necesarios.');
    }
  };

  return (
    <div>
      <h1>Calculadora de Resistencias</h1>
      <form onSubmit={handleCalculate}>
        <div>
          <label htmlFor="bandAColor">Banda A de Color:</label>
          <select id="bandAColor" name="bandAColor" onChange={handleBandAColorChange} value={bandAColor}>
            <option value="">Selecciona...</option>
            {bandColors.map((color) => (
              <option key={color.color} value={color.color}>
                {color.color}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="bandBColor">Banda B de Color:</label>
          <select id="bandBColor" name="bandBColor" onChange={handleBandBColorChange} value={bandBColor}>
            <option value="">Selecciona...</option>
            {bandColors.map((color) => (
              <option key={color.color} value={color.color}>
                {color.color}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="multiplier">Selecciona el Multiplicador:</label>
          <select id="multiplier" name="multiplier" onChange={handleMultiplierChange} value={selectedMultiplier}>
            <option value="">Selecciona...</option>
            {multiplierOptions.map((option) => (
              <option key={option._id} value={option.value}>
                {option.color}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tolerance">Selecciona la Tolerancia:</label>
          <select id="tolerance" name="tolerance" onChange={handleToleranceChange} value={selectedTolerance}>
            <option value="">Selecciona...</option>
            {toleranceOptions.map((option) => (
              <option key={option._id} value={option.value}>
                {option.color}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Calcular</button>
      </form>
      {resistanceValue !== null && (
        <div>
          <p>El valor de la resistencia calculada es: {resistanceValue} Ohms</p>
        </div>
      )}
    </div>
  );
}

export default Calculator;
