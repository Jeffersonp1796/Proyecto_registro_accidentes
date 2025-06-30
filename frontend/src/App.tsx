import { useState } from 'react';
import FormularioEvento from './components/FormularioEvento';
import TablaEventos from './components/TablaEventos'; 
import DetalleEvento from './components/DetalleEvento'; 
import Estadisticas from './components/Estadisticas'; 

function App() {
  const [verDetalle, setVerDetalle] = useState<number | null>(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Registro de Accidentes e Incidentes de Trabajo</h1>
      </header>

      <main className="app-main">
        <FormularioEvento />
        {verDetalle ? (
          <DetalleEvento id={verDetalle} onVolver={() => setVerDetalle(null)} onEditar={(evento) => {
            console.log('Editar evento:', evento);
          }} />
        ) : (
          <div className="app-content">
            <TablaEventos onDetalle={setVerDetalle} />
            <Estadisticas />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2025 Registro de Accidentes. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;