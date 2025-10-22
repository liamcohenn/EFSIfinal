import { useParams, useNavigate } from "react-router-dom";
import { useMovimientos } from "../context/MovimientosContext";
import MovimientoForm from "../components/movimientoForm";
import { useMemo } from "react";

export default function Editar(){
  const { id } = useParams();
  const { movimientos, updateMovimiento, removeMovimiento } = useMovimientos();
  const navigate = useNavigate();

  const current = useMemo(() => movimientos.find(m => String(m.id) === String(id)), [movimientos, id]);

  if (!current) {
    return <section className="card"><h2>Editar</h2><p className="helper">No se encontró el movimiento.</p></section>
  }

  const handleSubmit = (values, actions) => {
    updateMovimiento(current.id, values);
    actions.setSubmitting(false);
    navigate("/");
  };

  const handleDelete = () => {
    if (confirm("¿Eliminar este movimiento?")) {
      removeMovimiento(current.id);
      navigate("/");
    }
  };

  return (
    <section style={{ display: "grid", gap: 12 }}>
      <MovimientoForm initialValues={current} submitLabel="Guardar cambios" onSubmit={handleSubmit} />
      <div className="card" style={{ display:"flex", justifyContent:"flex-end" }}>
        <button className="btn warning" onClick={handleDelete}>Eliminar</button>
      </div>
    </section>
  );
}
