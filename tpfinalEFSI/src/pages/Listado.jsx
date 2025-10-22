import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMovimientos } from '../context/MovimientosContext'
import ListaMovimientos from '../components/ListaMovimientos'

export default function Listado(){
  const { movimientos, removeMovimiento } = useMovimientos()

  // filtros básicos
  const [q, setQ] = useState("")
  const [tipo, setTipo] = useState("")          // "", "Ingreso", "Gasto"
  const [categoria, setCategoria] = useState("") // "", "Alimentación", ...

  const filtered = useMemo(() => {
    return movimientos.filter(m => {
      const matchQ = q ? (m.descripcion.toLowerCase().includes(q.toLowerCase())) : true
      const matchTipo = tipo ? m.tipo === tipo : true
      const matchCat = categoria ? m.categoria === categoria : true
      return matchQ && matchTipo && matchCat
    })
  }, [movimientos, q, tipo, categoria])

  const onDelete = (id) => {
    if (confirm("¿Eliminar este movimiento?")) {
      removeMovimiento(id)
    }
  }

  const categorias = useMemo(() => {
    const set = new Set(movimientos.map(m => m.categoria).filter(Boolean))
    return ["", ...Array.from(set)]
  }, [movimientos])

  return (
    <section className="card" style={{ display: 'grid', gap: 12 }}>
      <div className="row">
        <h2 style={{margin:0}}>Listado</h2>
        <div style={{ display:'flex', gap:8 }}>
          <Link to="/nuevo" className="btn primary">+ Nuevo</Link>
        </div>
      </div>

      {/* Filtros */}
      <div className="row" style={{ gap: 8, flexWrap:'wrap' }}>
        <input
          className="btn"
          placeholder="Buscar por descripción…"
          value={q}
          onChange={e=>setQ(e.target.value)}
          style={{ minWidth: 240 }}
        />
        <select className="btn" value={tipo} onChange={e=>setTipo(e.target.value)}>
          <option value="">Todos (tipo)</option>
          <option value="Ingreso">Ingreso</option>
          <option value="Gasto">Gasto</option>
        </select>
        <select className="btn" value={categoria} onChange={e=>setCategoria(e.target.value)}>
          {categorias.map(c => <option key={c} value={c}>{c || "Todas (categoría)"}</option>)}
        </select>
      </div>

      <ListaMovimientos movimientos={filtered} onDelete={onDelete} />
    </section>
  )
}
