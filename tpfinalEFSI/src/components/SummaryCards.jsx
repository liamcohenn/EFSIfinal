export default function SummaryCards({ ingresos, gastos, balance }) {
    const fmt = n => new Intl.NumberFormat('es-AR', { style:'currency', currency:'ARS', maximumFractionDigits:0 }).format(n || 0);
    const kpi = (label, value, extraClass) => (
      <div className={`card`} style={{flex:1}}>
        <div className="helper">{label}</div>
        <div style={{fontSize:22, fontWeight:700}} className={extraClass}>{fmt(value)}</div>
      </div>
    );
  
    return (
      <div style={{display:'grid', gap:12, gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))'}}>
        {kpi('Ingresos', ingresos, 'kpi-ingreso')}
        {kpi('Gastos', gastos, 'kpi-gasto')}
        {kpi('Balance', balance, balance >= 0 ? 'kpi-ingreso' : 'kpi-gasto')}
      </div>
    );
  }
  