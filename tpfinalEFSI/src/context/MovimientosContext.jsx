import { createContext, useContext, useEffect, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { movimientosMock } from '../data/movimientosMock'

const MovimientosContext = createContext(null)

const STORAGE_KEY = 'mi-presupuesto:movimientos'
const THEME_KEY = 'mi-presupuesto:dark'

function genId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID()
  return String(Date.now() + Math.floor(Math.random() * 100000))
}

export function MovimientosProvider({ children }) {
  const [movimientos, setMovimientos] = useLocalStorage(STORAGE_KEY, [])
  const [dark, setDark] = useLocalStorage(THEME_KEY, false)

  // Seed inicial si está vacío
  useEffect(() => {
    if (!movimientos || movimientos.length === 0) {
      setMovimientos(movimientosMock)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Tema
  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])

  // CRUD
  const addMovimiento = (data) => {
    const nuevo = { ...data, id: genId(), monto: Number(data.monto) }
    setMovimientos(prev => [nuevo, ...prev].sort((a,b) => new Date(b.fecha) - new Date(a.fecha)))
  }

  const updateMovimiento = (id, data) => {
    setMovimientos(prev =>
      prev.map(m => String(m.id) === String(id) ? { ...m, ...data, monto: Number(data.monto) } : m)
         .sort((a,b) => new Date(b.fecha) - new Date(a.fecha))
    )
  }

  const removeMovimiento = (id) => {
    setMovimientos(prev => prev.filter(m => String(m.id) !== String(id)))
  }

  const resetDatos = () => setMovimientos(movimientosMock)
  const toggleDark = () => setDark(!dark)

  const value = useMemo(() => ({
    movimientos,
    setMovimientos,
    addMovimiento,
    updateMovimiento,
    removeMovimiento,
    resetDatos,
    dark,
    toggleDark
  }), [movimientos, dark])

  return (
    <MovimientosContext.Provider value={value}>
      {children}
    </MovimientosContext.Provider>
  )
}

export function useMovimientos() {
  const ctx = useContext(MovimientosContext)
  if (!ctx) throw new Error('useMovimientos debe usarse dentro de MovimientosProvider')
  return ctx
}
