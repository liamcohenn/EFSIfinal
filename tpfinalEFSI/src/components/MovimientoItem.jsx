import { Link } from 'react-router-dom'

function formatCurrency(n){
  try{
    return new Intl.NumberFormat('es-AR', { style:'currency', currency:'ARS', maximumFractionDigits:0 }).format(n)
  }catch{
    return `$ ${n}`
  }
}

export default function MovimientoItem({ m, onDelete }){
  return (
    <div className="item">
      {/* Col 1: Descripción + categoría */}
      <div className="item-info">
        <div className="item-title">{m.descripcion}</div>
        <div className="item-sub">{m.categoria}</div>
      </div>

      {/* Col 2: Tipo */}
      <div className={`tipo ${m.tipo.toLowerCase()}`}>{m.tipo}</div>

      {/* Col 3: Monto (derecha) */}
      <div className="item-monto">{formatCurrency(m.monto)}</div>

      {/* Col 4: Fecha (separada del monto) */}
      <div className="item-fecha">{new Date(m.fecha).toLocaleDateString('es-AR')}</div>

      {/* Col 5: Acciones */}
      <div className="item-actions">
        <Link to={`/editar/${m.id}`} className="btn ghost">Editar</Link>
        <button className="btn danger" onClick={() => onDelete?.(m.id)}>Eliminar</button>
      </div>
    </div>
  )
}
