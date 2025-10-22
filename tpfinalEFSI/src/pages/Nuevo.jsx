import { useNavigate } from "react-router-dom";
import { useMovimientos } from "../context/MovimientosContext";
import MovimientoForm from "../components/movimientoForm";

export default function Nuevo(){
  const { addMovimiento } = useMovimientos();
  const navigate = useNavigate();

  const handleSubmit = (values, actions) => {
    addMovimiento(values);
    actions.setSubmitting(false);
    navigate("/");
  };

  return (
    <section>
      <MovimientoForm submitLabel="Crear movimiento" onSubmit={handleSubmit} />
    </section>
  );
}
