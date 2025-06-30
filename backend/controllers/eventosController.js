let eventos = [];
let idActual = 1;

exports.obtenerEventos = (req, res) => {
  res.json(eventos);
};

exports.crearEvento = (req, res) => {
  const { fecha, tipo, lugar, persona_afectada, descripcion } = req.body;
  const evidencia = req.file ? req.file.filename : null;
  const nuevoEvento = {
    id: idActual++,
    fecha, tipo, lugar, persona_afectada, descripcion, evidencia
  };
  eventos.push(nuevoEvento);
  res.json({ id: nuevoEvento.id });
};

exports.obtenerEvento = (req, res) => {
  const evento = eventos.find(e => e.id === parseInt(req.params.id));
  if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
  res.json(evento);
};

exports.actualizarEvento = (req, res) => {
  const index = eventos.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Evento no encontrado' });

  const { fecha, tipo, lugar, persona_afectada, descripcion } = req.body;
  eventos[index] = { ...eventos[index], fecha, tipo, lugar, persona_afectada, descripcion };
  res.json({ message: 'Evento actualizado' });
};

exports.eliminarEvento = (req, res) => {
  const index = eventos.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Evento no encontrado' });

  eventos.splice(index, 1);
  res.json({ message: 'Evento eliminado' });
};
