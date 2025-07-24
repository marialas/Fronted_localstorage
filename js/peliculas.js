document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPelicula");
  const tabla = document.getElementById("tablaPeliculas");

  let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
  let editIndex = -1;

  const mostrarPeliculas = () => {
    tabla.innerHTML = "";
    peliculas.forEach((p, i) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${p.titulo}</td>
        <td>${p.director}</td>
        <td>${p.anio}</td>
        <td>
          <button onclick="editar(${i})">✏️</button>
          <button onclick="eliminar(${i})">🗑️</button>
        </td>`;
      tabla.appendChild(fila);
    });
  };

  window.editar = (index) => {
    const peli = peliculas[index];
    document.getElementById("titulo").value = peli.titulo;
    document.getElementById("director").value = peli.director;
    document.getElementById("anio").value = peli.anio;
    editIndex = index;
  };

  window.eliminar = (index) => {
    if (confirm("¿Deseas eliminar esta película?")) {
      peliculas.splice(index, 1);
      localStorage.setItem("peliculas", JSON.stringify(peliculas));
      mostrarPeliculas();
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevaPelicula = {
      titulo: document.getElementById("titulo").value,
      director: document.getElementById("director").value,
      anio: parseInt(document.getElementById("anio").value)
    };

    if (editIndex >= 0) {
      peliculas[editIndex] = nuevaPelicula;
      editIndex = -1;
    } else {
      peliculas.push(nuevaPelicula);
    }

    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    form.reset();
    mostrarPeliculas();
  });

  mostrarPeliculas();
});
