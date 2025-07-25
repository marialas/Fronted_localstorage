// Guardar en localStorage
export function guardarEnStorage(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}

// Obtener desde localStorage
export function obtenerDeStorage(clave) {
  return JSON.parse(localStorage.getItem(clave)) || [];
}

// Confirmación con mensaje
export function confirmarAccion(mensaje) {
  return confirm(mensaje);
}

// Limpia todos los campos de un formulario
export function resetearFormulario(form) {
  form.reset();
}
