import { NavLink } from 'react-router-dom'

export default function Navbar(){
  const active = ({ isActive }) => isActive ? 'active' : ''
  return (
    <nav className="nav">
      <NavLink to="/" className={active}>Inicio</NavLink>
      <NavLink to="/nuevo" className={active}>Nuevo</NavLink>
      <NavLink to="/resumen" className={active}>Resumen</NavLink>
      <NavLink to="/ajustes" className={active}>Ajustes</NavLink>
    </nav>
  )
}
