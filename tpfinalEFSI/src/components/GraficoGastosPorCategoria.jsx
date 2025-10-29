import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORES = ["#7c3aed","#ef4444","#10b981","#f59e0b","#3b82f6","#14b8a6","#e11d48","#6b7280"];

export default function GraficoGastosPorCategoria({ datos }) {
  if (!datos || datos.length === 0) {
    return <div className="card helper">No hay gastos para graficar por categoría.</div>;
  }
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Gastos por categoría</h3>
      <div style={{width:'100%', height:300}}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="valor" data={datos} outerRadius={110} label>
              {datos.map((_, i) => <Cell key={i} fill={COLORES[i % COLORES.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
