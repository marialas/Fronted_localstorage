document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formUsuario");
  const tabla = document.getElementById("tablaUsuarios");

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let editIndex = -1;

  const mostrarUsuarios = () => {
    tabla.innerHTML = "";
    usuarios.forEach((u, i) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${u.nombre}</td>
        <td>${u.correo}</td>
        <td>${u.rol}</td>
        <td>
          <button onclick="editar(${i})">✏️</button>
          <button onclick="eliminar(${i})">🗑️</button>
        </td>`;
      tabla.appendChild(fila);
    });
  };

  window.editar = (index) => {
    const usuario = usuarios[index];
    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("correo").value = usuario.correo;
    document.getElementById("rol").value = usuario.rol;
    editIndex = index;
  };

  window.eliminar = (index) => {
    if (confirm("¿Deseas eliminar este usuario?")) {
      usuarios.splice(index, 1);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      mostrarUsuarios();
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevoUsuario = {
      nombre: document.getElementById("nombre").value,
      correo: document.getElementById("correo").value,
      rol: document.getElementById("rol").value
    };

    if (editIndex >= 0) {
      usuarios[editIndex] = nuevoUsuario;
      editIndex = -1;
    } else {
      usuarios.push(nuevoUsuario);
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    form.reset();
    mostrarUsuarios();
  });

  mostrarUsuarios();
});
