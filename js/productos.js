document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formProducto");
  const tabla = document.getElementById("tablaProductos");

  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  let editIndex = -1;

  const mostrarProductos = () => {
    tabla.innerHTML = "";
    productos.forEach((p, i) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${p.nombre}</td>
        <td>${p.precio}</td>
        <td>${p.categoria}</td>
        <td>
          <button onclick="editar(${i})">✏️</button>
          <button onclick="eliminar(${i})">🗑️</button>
        </td>`;
      tabla.appendChild(fila);
    });
  };

  window.editar = (index) => {
    const prod = productos[index];
    document.getElementById("nombre").value = prod.nombre;
    document.getElementById("precio").value = prod.precio;
    document.getElementById("categoria").value = prod.categoria;
    editIndex = index;
  };

  window.eliminar = (index) => {
    if (confirm("¿Deseas eliminar este producto?")) {
      productos.splice(index, 1);
      localStorage.setItem("productos", JSON.stringify(productos));
      mostrarProductos();
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevoProducto = {
      nombre: document.getElementById("nombre").value,
      precio: parseFloat(document.getElementById("precio").value),
      categoria: document.getElementById("categoria").value
    };

    if (editIndex >= 0) {
      productos[editIndex] = nuevoProducto;
      editIndex = -1;
    } else {
      productos.push(nuevoProducto);
    }

    localStorage.setItem("productos", JSON.stringify(productos));
    form.reset();
    mostrarProductos();
  });

  mostrarProductos();
});
