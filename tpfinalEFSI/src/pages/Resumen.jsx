import { useMovimientos } from "../context/MovimientosContext";
import { gastosPorCategoria, evolucionMensual, totales } from "../utils/aggregations";
import SummaryCards from "../components/SummaryCards";
import ChartGastosPorCategoria from "../components/ChartGastosPorCategoria";
import ChartEvolucionMensual from "../components/ChartEvolucionMensual";

export default function Resumen(){
  const { movimientos } = useMovimientos();
  const t = totales(movimientos);
  const porCat = gastosPorCategoria(movimientos);
  const evo = evolucionMensual(movimientos);

  return (
    <section style={{display:'grid', gap:12}}>
      <SummaryCards ingresos={t.ingresos} gastos={t.gastos} balance={t.balance} />
      <ChartGastosPorCategoria data={porCat} />
      <ChartEvolucionMensual data={evo} />
    </section>
  );
}
