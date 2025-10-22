import * as Yup from "yup";

export const movimientoSchema = Yup.object({
  descripcion: Yup.string()
    .required("La descripción es obligatoria")
    .min(3, "Mínimo 3 caracteres"),
  categoria: Yup.string().required("La categoría es obligatoria"),
  tipo: Yup.mixed().oneOf(["Ingreso", "Gasto"], "Tipo inválido").required(),
  monto: Yup.number()
    .typeError("Debe ser un número")
    .positive("Debe ser mayor a 0")
    .required("El monto es obligatorio"),
  fecha: Yup.date()
    .typeError("Fecha inválida")
    .max(new Date(), "No puede ser futura")
    .required("La fecha es obligatoria"),
});