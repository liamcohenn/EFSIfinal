import { useMovimientos } from '../context/MovimientosContext'
import ListaMovimientos from '../components/ListaMovimientos'

export default function Listado(){
  const { movimientos } = useMovimientos()

  return (
    <section className="card">
      <div className="row">
        <h2 style={{margin:0}}>Listado</h2>
        <span className="helper">{movimientos.length} movimiento(s)</span>
      </div>
      <ListaMovimientos movimientos={movimientos} />
    </section>
  )
}
