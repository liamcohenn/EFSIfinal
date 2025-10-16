import { createContext, useContext, useEffect, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { movimientosMock } from '../data/movimientosMock'

const MovimientosContext = createContext(null)

const STORAGE_KEY = 'mi-presupuesto:movimientos'
const THEME_KEY = 'mi-presupuesto:dark'

export function MovimientosProvider({ children }) {
  const [movimientos, setMovimientos] = useLocalStorage(STORAGE_KEY, [])
  const [dark, setDark] = useLocalStorage(THEME_KEY, false)

  // Seed inicial en el primer run (si está vacío)
  useEffect(() => {
    if (!movimientos || movimientos.length === 0) {
      setMovimientos(movimientosMock)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Aplica clase para tema oscuro/claro
  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])

  const resetDatos = () => setMovimientos(movimientosMock)
  const toggleDark = () => setDark(!dark)

  const value = useMemo(() => ({
    movimientos,
    setMovimientos,
    resetDatos,
    dark,
    toggleDark
  }), [movimientos, setMovimientos, dark])

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
