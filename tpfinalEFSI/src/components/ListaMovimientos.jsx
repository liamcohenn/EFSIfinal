import MovimientoItem from './MovimientoItem'

export default function ListaMovimientos({ movimientos }){
  if (!movimientos || movimientos.length === 0){
    return <div className="card helper">No hay movimientos aún.</div>
  }
  return (
    <div className="list">
      {movimientos.map(m => <MovimientoItem key={m.id} m={m} />)}
    </div>
  )
}
