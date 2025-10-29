import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMovimientos } from '../context/MovimientosContext'
import ListaMovimientos from '../components/ListaMovimientos'

export default function Listado(){
  const { movimientos, removeMovimiento } = useMovimientos()

  // Filtros
  const [q, setQ] = useState("")
  const [tipo, setTipo] = useState("")
  const [categoria, setCategoria] = useState("")
  const [desde, setDesde] = useState("")     // yyyy-mm-dd
  const [hasta, setHasta] = useState("")     // yyyy-mm-dd
  const [minMonto, setMinMonto] = useState("")
  const [maxMonto, setMaxMonto] = useState("")
  const [orden, setOrden] = useState("fecha-desc") // fecha-asc|fecha-desc|monto-asc|monto-desc

  const filtered = useMemo(() => {
    let out = [...movimientos];
    out = out.filter(m => q ? m.descripcion.toLowerCase().includes(q.toLowerCase()) : true);
    out = out.filter(m => tipo ? m.tipo === tipo : true);
    out = out.filter(m => categoria ? m.categoria === categoria : true);
    out = out.filter(m => desde ? new Date(m.fecha) >= new Date(desde) : true);
    out = out.filter(m => hasta ? new Date(m.fecha) <= new Date(hasta) : true);
    out = out.filter(m => minMonto ? Number(m.monto) >= Number(minMonto) : true);
    out = out.filter(m => maxMonto ? Number(m.monto) <= Number(maxMonto) : true);

    switch (orden) {
      case "fecha-asc":    out.sort((a,b)=> new Date(a.fecha) - new Date(b.fecha)); break;
      case "monto-asc":    out.sort((a,b)=> Number(a.monto) - Number(b.monto)); break;
      case "monto-desc":   out.sort((a,b)=> Number(b.monto) - Number(a.monto)); break;
      default:             out.sort((a,b)=> new Date(b.fecha) - new Date(a.fecha));
    }
    return out;
  }, [movimientos, q, tipo, categoria, desde, hasta, minMonto, maxMonto, orden]);

  const onDelete = (id) => {
    if (confirm("¿Eliminar este movimiento?")) removeMovimiento(id)
  }

  const categorias = useMemo(() => {
    const set = new Set(movimientos.map(m => m.categoria).filter(Boolean))
    return ["", ...Array.from(set)]
  }, [movimientos])

  return (
    <section className="card" style={{ display: 'grid', gap: 12 }}>
      <div className="row">
        <h2 style={{margin:0}}>Listado</h2>
        <Link to="/nuevo" className="btn primary">+ Nuevo</Link>
      </div>

      {/* Filtros avanzados */}
      <div className="card" style={{display:'grid', gap:8}}>
        <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
          <input className="btn" placeholder="Buscar…" value={q} onChange={e=>setQ(e.target.value)} style={{minWidth:220}} />
          <select className="btn" value={tipo} onChange={e=>setTipo(e.target.value)}>
            <option value="">Tipo (todos)</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Gasto">Gasto</option>
          </select>
          <select className="btn" value={categoria} onChange={e=>setCategoria(e.target.value)}>
            {categorias.map(c => <option key={c} value={c}>{c || "Categoría (todas)"}</option>)}
          </select>
          <input className="btn" type="date" value={desde} onChange={e=>setDesde(e.target.value)} />
          <input className="btn" type="date" value={hasta} onChange={e=>setHasta(e.target.value)} />
          <input className="btn" type="number" placeholder="Monto mín." value={minMonto} onChange={e=>setMinMonto(e.target.value)} style={{width:120}} />
          <input className="btn" type="number" placeholder="Monto máx." value={maxMonto} onChange={e=>setMaxMonto(e.target.value)} style={{width:120}} />
          <select className="btn" value={orden} onChange={e=>setOrden(e.target.value)}>
            <option value="fecha-desc">Fecha ↓</option>
            <option value="fecha-asc">Fecha ↑</option>
            <option value="monto-desc">Monto ↓</option>
            <option value="monto-asc">Monto ↑</option>
          </select>
        </div>
      </div>

      <ListaMovimientos movimientos={filtered} onDelete={onDelete} />
    </section>
  )
}
