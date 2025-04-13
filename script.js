// Definición de habilidades por categoría
const habilidadesPorCategoria = {
    conocimiento: [
      { nombre: "Lectura", nivel: 2, misiones: [
        { tarea: "Leer 10 páginas", completada: false },
        { tarea: "Leer durante 3 días seguidos", completada: false },
        { tarea: "Comentar un libro en redes", completada: false }
      ]},
      { nombre: "Historia", nivel: 3, misiones: [
        { tarea: "Estudiar 1 hora", completada: false },
        { tarea: "Ver un documental histórico", completada: false },
        { tarea: "Escribir un resumen de lo aprendido", completada: false }
      ]}
    ],
    habilidades: [
      { nombre: "Cubo Rubik", nivel: 1, misiones: [
        { tarea: "Resolver 1 cara", completada: false },
        { tarea: "Resolver 3 caras", completada: false },
        { tarea: "Resolver el cubo entero", completada: false }
      ]},
      { nombre: "Ajedrez", nivel: 2, misiones: [
        { tarea: "Jugar 3 partidas", completada: false },
        { tarea: "Leer sobre aperturas", completada: false },
        { tarea: "Jugar con un oponente", completada: false }
      ]}
    ],
    idiomas: [
      { nombre: "Inglés", nivel: 4, misiones: [
        { tarea: "Ver una serie en inglés", completada: false },
        { tarea: "Leer 2 artículos", completada: false },
        { tarea: "Hablar con un nativo", completada: false }
      ]}
    ]
    // Añadir más categorías y habilidades aquí si es necesario
  };
  
  let categoriaActual = null;
  let habilidadActual = null;
  
  // Mostrar las categorías
  document.querySelectorAll('.categoria').forEach(cat => {
    cat.addEventListener('click', () => {
      categoriaActual = cat.dataset.categoria;
      mostrarHabilidades(categoriaActual);
    });
  });
  
  // Mostrar habilidades dentro de la categoría
  function mostrarHabilidades(categoria) {
    const zonaCategorias = document.getElementById('categorias');
    const zonaHabilidades = document.getElementById('zona-habilidades');
    const lista = document.getElementById('lista-habilidades');
    const titulo = document.getElementById('titulo-categoria');
  
    titulo.textContent = "📂 " + categoria.charAt(0).toUpperCase() + categoria.slice(1);
    lista.innerHTML = "";
  
    habilidadesPorCategoria[categoria].forEach((hab, index) => {
      const div = document.createElement('div');
      div.className = 'habilidad';
      div.dataset.index = index;
  
      div.innerHTML = `
        <h3>${hab.nombre}</h3>
        <div class="nivel">Nivel ${hab.nivel}</div>
        <ul class="misiones">
          ${hab.misiones.map((m, i) => `
            <li>
              <label><input type="checkbox" data-habilidad="${index}" data-mision="${i}"> ${m.tarea}</label>
            </li>
          `).join('')}
        </ul>
        <button class="subir" data-habilidad="${index}">Subir de Nivel</button>
      `;
  
      lista.appendChild(div);
    });
  
    zonaCategorias.style.display = 'none';
    zonaHabilidades.style.display = 'block';
  
    // Añadir eventos a los checkboxes
    document.querySelectorAll('.misiones input').forEach(cb => {
      cb.addEventListener('change', actualizarBoton);
    });
  
    // Añadir evento para subir de nivel
    document.querySelectorAll('.subir').forEach(btn => {
      btn.addEventListener('click', () => subirNivel(btn.dataset.habilidad));
    });
  }
  
  // Volver a la pantalla principal
  function volver() {
    document.getElementById('zona-habilidades').style.display = 'none';
    document.getElementById('categorias').style.display = 'grid';
  }
  
  // Actualizar el estado del botón de "subir de nivel"
  function actualizarBoton() {
    document.querySelectorAll('.habilidad').forEach(habilidad => {
      const index = habilidad.dataset.index;
      const habilidadData = habilidadesPorCategoria[categoriaActual][index];
      const checkboxes = habilidad.querySelectorAll('input[type="checkbox"]');
      const todosCompletados = Array.from(checkboxes).every(cb => cb.checked);
  
      const btnSubir = habilidad.querySelector('.subir');
      btnSubir.style.display = todosCompletados ? 'inline-block' : 'none';
    });
  }
  
  // Subir de nivel
  function subirNivel(index) {
    const habilidad = habilidadesPorCategoria[categoriaActual][index];
    if (habilidad.nivel < 10) {
      habilidad.nivel++;
      habilidad.misiones.forEach(m => m.completada = false);  // Resetear misiones
      mostrarHabilidades(categoriaActual);  // Actualizar la vista con nuevas misiones
    }
  }
  