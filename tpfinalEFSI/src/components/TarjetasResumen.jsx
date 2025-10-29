export default function TarjetasResumen({ ingresos, gastos, balance }) {
    const fmt = n => new Intl.NumberFormat('es-AR', { style:'currency', currency:'ARS', maximumFractionDigits:0 }).format(n || 0);
    const tarjeta = (titulo, valor, claseExtra) => (
      <div className={`card`} style={{flex:1}}>
        <div className="helper">{titulo}</div>
        <div style={{fontSize:22, fontWeight:700}} className={claseExtra}>{fmt(valor)}</div>
      </div>
    );
  
    return (
      <div style={{display:'grid', gap:12, gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))'}}>
        {tarjeta('Ingresos', ingresos, 'kpi-ingreso')}
        {tarjeta('Gastos', gastos, 'kpi-gasto')}
        {tarjeta('Balance', balance, balance >= 0 ? 'kpi-ingreso' : 'kpi-gasto')}
      </div>
    );
  }
  