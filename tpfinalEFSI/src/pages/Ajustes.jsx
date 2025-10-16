import { useMovimientos } from '../context/MovimientosContext'

export default function Ajustes(){
  const { resetDatos, dark, toggleDark } = useMovimientos()

  return (
    <section className="card">
      <h2>Ajustes</h2>

      <div className="row">
        <div>
          <div style={{fontWeight:600}}>Tema</div>
          <div className="helper">Cambia entre modo claro/oscuro</div>
        </div>
        <button className="btn" onClick={toggleDark}>
          {dark ? '☀️ Pasar a claro' : '🌙 Pasar a oscuro'}
        </button>
      </div>

      <div className="row">
        <div>
          <div style={{fontWeight:600}}>Reiniciar datos</div>
          <div className="helper">Vuelve a cargar los datos de ejemplo</div>
        </div>
        <button className="btn warning" onClick={resetDatos}>
          Restablecer mock
        </button>
      </div>
    </section>
  )
}
