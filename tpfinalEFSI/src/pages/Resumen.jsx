import { useMovimientos } from "../context/MovimientosContext";
import { gastosPorCategoria, evolucionMensual, calcularTotales } from "../utils/estadisticas";
import TarjetasResumen from "../components/TarjetasResumen";
import GraficoGastosPorCategoria from "../components/GraficoGastosPorCategoria";
import GraficoEvolucionMensual from "../components/GraficoEvolucionMensual";

export default function ResumenGeneral(){
  const { movimientos } = useMovimientos();
  const tot = calcularTotales(movimientos);
  const porCat = gastosPorCategoria(movimientos);
  const evo = evolucionMensual(movimientos);

  return (
    <section style={{display:'grid', gap:12}}>
      <TarjetasResumen ingresos={tot.ingresos} gastos={tot.gastos} balance={tot.balance} />
      <GraficoGastosPorCategoria datos={porCat} />
      <GraficoEvolucionMensual datos={evo} />
    </section>
  );
}
