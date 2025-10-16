import { useMovimientos } from '../context/MovimientosContext'

export default function Header(){
  const { dark, toggleDark } = useMovimientos()

  return (
    <header className="header">
      <h1 className="title">Mi Presupuesto</h1>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <span className="badge">Entrega Semana 1</span>
        <button className="btn" onClick={toggleDark}>
          {dark ? '☀️ Claro' : '🌙 Oscuro'}
        </button>
      </div>
    </header>
  )
}
