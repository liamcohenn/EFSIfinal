export function esGasto(m) { return m.tipo === "Gasto"; }
export function esIngreso(m) { return m.tipo === "Ingreso"; }

export function sumar(lista, sel = x => x) {
  return lista.reduce((acc, it) => acc + Number(sel(it) || 0), 0);
}

export function calcularTotales(movs) {
  const ingresos = sumar(movs.filter(esIngreso), m => m.monto);
  const gastos = sumar(movs.filter(esGasto), m => m.monto);
  return { ingresos, gastos, balance: ingresos - gastos };
}

export function gastosPorCategoria(movs) {
  const mapa = new Map();
  movs.filter(esGasto).forEach(m => {
    mapa.set(m.categoria, (mapa.get(m.categoria) || 0) + Number(m.monto));
  });
  return Array.from(mapa.entries()).map(([nombre, valor]) => ({ nombre, valor }));
}

function claveMesAño(fecha) {
  const f = new Date(fecha);
  return `${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,'0')}`;
}

export function evolucionMensual(movs) {
  const mapa = new Map();
  movs.forEach(m => {
    const clave = claveMesAño(m.fecha);
    const prev = mapa.get(clave) || { mes: clave, ingresos: 0, gastos: 0 };
    if (esIngreso(m)) prev.ingresos += Number(m.monto);
    else prev.gastos += Number(m.monto);
    mapa.set(clave, prev);
  });
  const arr = Array.from(mapa.values())
    .map(r => ({ ...r, balance: r.ingresos - r.gastos }))
    .sort((a,b) => a.mes.localeCompare(b.mes));
  return arr;
}
