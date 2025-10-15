import { Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Navbar from './components/Navbar'
import Listado from './pages/Listado'
import Nuevo from './pages/Nuevo'
import Editar from './pages/Editar'
import Resumen from './pages/Resumen'
import Ajustes from './pages/Ajustes'

export default function App() {
  return (
    <div className="app">
      <Header />
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Listado />} />
          <Route path="/nuevo" element={<Nuevo />} />
          <Route path="/editar/:id" element={<Editar />} />
          <Route path="/resumen" element={<Resumen />} />
          <Route path="/ajustes" element={<Ajustes />} />
        </Routes>
      </main>
    </div>
  )
}
