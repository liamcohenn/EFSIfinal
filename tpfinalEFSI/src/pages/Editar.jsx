import { useParams } from 'react-router-dom'

export default function Editar(){
  const { id } = useParams()
  // Semana 2: formulario de edición cargando el registro por id
  return (
    <section className="card">
      <h2>Editar</h2>
      <p className="helper">Se editará el movimiento con id: <b>{id}</b> (Semana 2).</p>
    </section>
  )
}
