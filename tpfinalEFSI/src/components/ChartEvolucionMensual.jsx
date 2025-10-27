import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ComposedChart } from "recharts";

export default function ChartEvolucionMensual({ data }) {
  if (!data || data.length === 0) {
    return <div className="card helper">No hay datos mensuales para graficar.</div>;
  }
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Evolución mensual</h3>
      <div style={{width:'100%', height:320}}>
        <ResponsiveContainer>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ingresos" name="Ingresos" />
            <Bar dataKey="gastos" name="Gastos" />
            <Line type="monotone" dataKey="balance" name="Balance" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}