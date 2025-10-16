function formatCurrency(n){
  try{
    return new Intl.NumberFormat('es-AR', { style:'currency', currency:'ARS', maximumFractionDigits:0 }).format(n)
  }catch{
    return `$ ${n}`
  }
}

export default function MovimientoItem({ m }){
  return (
    <div className="item">
      <div>
        <div style={{fontWeight:600}}>{m.descripcion}</div>
        <div className="helper">{m.categoria}</div>
      </div>
      <div className={`tipo ${m.tipo.toLowerCase()}`}>{m.tipo}</div>
      <div style={{textAlign:'right', fontVariantNumeric:'tabular-nums'}}>
        {formatCurrency(m.monto)}
      </div>
      <div className="helper" style={{textAlign:'right'}}>
        {new Date(m.fecha).toLocaleDateString('es-AR')}
      </div>
    </div>
  )
}
