import MovimientoItem from './MovimientoItem'

export default function ListaMovimientos({ movimientos, onDelete }){
  if (!movimientos || movimientos.length === 0){
    return <div className="card helper">No hay movimientos para mostrar.</div>
  }
  return (
    <div className="list">
      {movimientos.map(m => (
        <MovimientoItem key={m.id} m={m} onDelete={onDelete} />
      ))}
    </div>
  )
}
