import { useEffect, useState } from 'react';
import API from '../api';
import type { Evento } from '../types';
import './DetalleEvento.css';

interface Props {
  id: number;
  onVolver: () => void;
  onEditar: (evento: Evento) => void;
}

export default function DetalleEvento({ id, onVolver, onEditar }: Props) {
  const [evento, setEvento] = useState<Evento | null>(null);

  useEffect(() => {
    API.get<Evento>(`/eventos/${id}`).then(res => setEvento(res.data));
  }, [id]);

  const handleEliminar = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      await API.delete(`/eventos/${id}`);
      alert('Evento eliminado');
      onVolver();
    }
  };

  const handleEditar = () => {
    if (evento) {
      onEditar(evento);
    }
  };

  if (!evento) return null;

  return (
    <div className="detalle-evento-container">
      <h2 className="detalle-evento-title">Detalle del Evento</h2>
      <div className="detalle-evento-info">
        <p><strong>Fecha:</strong> {evento.fecha}</p>
        <p><strong>Tipo:</strong> {evento.tipo}</p>
        <p><strong>Lugar:</strong> {evento.lugar}</p>
        <p><strong>Persona Afectada:</strong> {evento.persona_afectada}</p>
        <p><strong>Descripción:</strong> {evento.descripcion}</p>
        {evento.evidencia && (
          <a className="detalle-evento-evidencia" href={`http://localhost:3001/uploads/${evento.evidencia}`} target="_blank" rel="noreferrer">
            Ver Evidencia
          </a>
        )}
      </div>
      <div className="detalle-evento-buttons">
        <button className="detalle-evento-button" onClick={handleEditar}>Editar</button>
        <button className="detalle-evento-button" onClick={handleEliminar}>Eliminar</button>
        <button className="detalle-evento-button" onClick={onVolver}>Volver</button>
      </div>
    </div>
  );
}

