export function isGasto(m) { return m.tipo === "Gasto"; }
export function isIngreso(m) { return m.tipo === "Ingreso"; }

export function sum(arr, sel = x => x) {
  return arr.reduce((acc, it) => acc + Number(sel(it) || 0), 0);
}

export function totales(movs) {
  const ingresos = sum(movs.filter(isIngreso), m => m.monto);
  const gastos = sum(movs.filter(isGasto), m => m.monto);
  return { ingresos, gastos, balance: ingresos - gastos };
}

export function gastosPorCategoria(movs) {
  const map = new Map();
  movs.filter(isGasto).forEach(m => {
    map.set(m.categoria, (map.get(m.categoria) || 0) + Number(m.monto));
  });
  return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
}

function ymKey(d) {
  const dt = new Date(d);
  return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}`;
}

export function evolucionMensual(movs) {
  const map = new Map();
  movs.forEach(m => {
    const k = ymKey(m.fecha);
    const prev = map.get(k) || { month: k, ingresos: 0, gastos: 0 };
    if (isIngreso(m)) prev.ingresos += Number(m.monto);
    else prev.gastos += Number(m.monto);
    map.set(k, prev);
  });
  const arr = Array.from(map.values())
    .map(r => ({ ...r, balance: r.ingresos - r.gastos }))
    .sort((a,b) => a.month.localeCompare(b.month));
  return arr;
}
