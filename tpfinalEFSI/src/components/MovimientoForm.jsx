import { Formik, Form, Field, ErrorMessage } from "formik";
import { movimientoSchema } from "../validation/movimientoSchema";

const CATEGORIAS = [
  "Alimentación",
  "Transporte",
  "Ocio",
  "Trabajo",
  "Vivienda",
  "Educación",
  "Salud",
  "Otros",
];

export default function MovimientoForm({ initialValues, onSubmit, submitLabel = "Guardar" }) {
  const valores = {
    descripcion: "",
    categoria: "",
    tipo: "Gasto",
    monto: "",
    fecha: new Date().toISOString().slice(0, 10),
    ...initialValues,
  };

  return (
    <Formik
      initialValues={valores}
      validationSchema={movimientoSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="card" style={{ display: "grid", gap: 12 }}>
          <h2 style={{ margin: 0 }}>{submitLabel}</h2>

          <div>
            <label>Descripción</label>
            <Field name="descripcion" className="btn" />
            <ErrorMessage name="descripcion" component="div" className="helper" />
          </div>

          <div>
            <label>Categoría</label>
            <Field as="select" name="categoria" className="btn">
              <option value="">Seleccionar…</option>
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Field>
            <ErrorMessage name="categoria" component="div" className="helper" />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <label>Tipo</label>
              <Field as="select" name="tipo" className="btn">
                <option value="Ingreso">Ingreso</option>
                <option value="Gasto">Gasto</option>
              </Field>
              <ErrorMessage name="tipo" component="div" className="helper" />
            </div>

            <div style={{ flex: 1 }}>
              <label>Monto</label>
              <Field name="monto" type="number" step="any" className="btn" />
              <ErrorMessage name="monto" component="div" className="helper" />
            </div>

            <div style={{ flex: 1 }}>
              <label>Fecha</label>
              <Field name="fecha" type="date" className="btn" />
              <ErrorMessage name="fecha" component="div" className="helper" />
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button type="submit" className="btn primary" disabled={isSubmitting}>
              {submitLabel}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
