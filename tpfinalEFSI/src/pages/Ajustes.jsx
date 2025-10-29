import { useMovimientos } from '../context/MovimientosContext'

export default function Ajustes(){
  const { resetDatos, clearDatos, dark, toggleDark } = useMovimientos()

  return (
    <section className="card" style={{display:'grid', gap:12}}>
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
          <div style={{fontWeight:600}}>Vaciar datos</div>
          <div className="helper">Elimina todos los movimientos guardados</div>
        </div>
        <button className="btn warning" onClick={()=>{
          if (confirm("¿Vaciar todos los datos? Esta acción no se puede deshacer.")) clearDatos()
        }}>Vaciar</button>
      </div>
    </section>
  )
}
