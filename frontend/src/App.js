import logo from './logo.svg';
import './App.css';
import Calculator from './components/Calculator'; // Importa el componente Calculator


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi Aplicación de Calculadora de Resistencia</h1>
      </header>
      <main>
        <Calculator /> {/* Renderiza el componente Calculator aquí */}
      </main>
    </div>
  );
}

export default App;
