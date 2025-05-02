const habilidadesPorCategoria = {
  conocimiento: [
    {
      nombre: "Lectura",
      misiones: [
        ["Leer 10 páginas", "Leer 3 días", "Comentar un libro"],
        ["Leer 20 páginas", "Leer 5 días", "Escribir reseña"],
        ["Leer 50 páginas", "Leer 7 días", "Escribir artículo"],
        ["Leer 100 páginas", "Leer 10 días", "Dar charla sobre libro"],
        ["Leer 150 páginas", "Leer 14 días", "Analizar libro"],
        ["Leer 200 páginas", "Leer 20 días", "Escribir crítica literaria"],
        ["Leer 250 páginas", "Leer 25 días", "Dar conferencia sobre libro"],
        ["Leer 300 páginas", "Leer 30 días", "Participar en un club de lectura"],
        ["Leer 350 páginas", "Leer 35 días", "Escribir una tesis sobre libro"],
        ["Leer 400 páginas", "Leer 40 días", "Dirigir una mesa redonda sobre libro"]
      ]
    },
    {
      nombre: "Historia",
      misiones: [
        ["Estudiar 1h", "Ver documental", "Escribir resumen"],
        ["Estudiar 2h", "Ver documental avanzado", "Escribir ensayo"],
        ["Estudiar 5h", "Leer libro", "Escribir investigación"],
        ["Estudiar 10h", "Ver 3 documentales", "Escribir libro"],
        ["Estudiar 15h", "Leer 2 libros", "Escribir artículo académico"],
        ["Estudiar 20h", "Leer 3 libros", "Dar una conferencia"],
        ["Estudiar 25h", "Leer 4 libros", "Organizar un debate"],
        ["Estudiar 30h", "Leer 5 libros", "Escribir tesis"],
        ["Estudiar 35h", "Leer 6 libros", "Dar clases sobre historia"],
        ["Estudiar 50h", "Leer 7 libros", "Conducir un seminario"]
      ]
    }
  ],
  habilidades: [
    {
      nombre: "Cubo Rubik",
      misiones: [
        ["Resolver 1 cara", "Resolver 3 caras", "Resolver cubo"],
        ["Resolver 2 caras", "Resolver cubo con un solo movimiento", "Resolver cubo en menos de 5 minutos"],
        ["Resolver 3 caras", "Resolver cubo en menos de 3 minutos", "Resolver cubo sin mirar"],
        ["Resolver cubo en menos de 1 minuto", "Resolver 4 caras", "Resolver cubo a ciegas"],
        ["Resolver cubo en menos de 30 segundos", "Resolver cubo con una mano", "Resolver cubo con los ojos cerrados"],
        ["Resolver cubo en 15 segundos", "Resolver cubo con un solo giro", "Resolver cubo con 3 movimientos"],
        ["Resolver cubo en 10 segundos", "Resolver cubo con los pies", "Resolver cubo a la velocidad de un experto"],
        ["Resolver cubo en 5 segundos", "Resolver cubo a ciegas en menos de 30 segundos", "Resolver cubo en menos de 10 movimientos"],
        ["Resolver cubo en 3 segundos", "Resolver cubo con los ojos vendados", "Resolver cubo en una mano en menos de 15 segundos"],
        ["Resolver cubo en 1 segundo", "Resolver cubo sin mirar", "Resolver cubo con los pies en menos de 10 segundos"]
      ]
    },
    {
      nombre: "Ajedrez",
      misiones: [
        ["Jugar 3 partidas", "Leer aperturas", "Jugar con oponente"],
        ["Jugar 5 partidas", "Estudiar tácticas", "Jugar con un maestro"],
        ["Jugar 10 partidas", "Leer libro de ajedrez", "Participar en un torneo"],
        ["Jugar 15 partidas", "Estudiar aperturas complejas", "Jugar con un gran maestro"],
        ["Jugar 20 partidas", "Estudiar finales", "Dar clases de ajedrez"],
        ["Jugar 25 partidas", "Resolver 100 problemas de ajedrez", "Jugar una partida rápida"],
        ["Jugar 30 partidas", "Estudiar partidas históricas", "Jugar ajedrez blitz"],
        ["Jugar 40 partidas", "Estudiar aperturas avanzadas", "Participar en una liga de ajedrez"],
        ["Jugar 50 partidas", "Estudiar aperturas y finales profundos", "Dar conferencias sobre ajedrez"],
        ["Jugar 60 partidas", "Leer 2 libros de ajedrez", "Ser entrenador de ajedrez"]
      ]
    }
  ],
  idiomas: [
    {
      nombre: "Inglés aplicado",
      misiones: [
        ["Leer un artículo corto en inglés", "Ver un video de 5 min con subtítulos", "Escribir 3 frases sobre ti"],
        ["Leer una noticia en inglés", "Escuchar un podcast básico", "Traducir una canción fácil"],
        ["Ver un capítulo de una serie en inglés con subtítulos", "Escribir una reseña de lo que viste", "Aprender 15 palabras nuevas"],
        ["Leer una historia corta sin traducir", "Grabar un audio hablando de tu día", "Escribir una pequeña historia"],
        ["Hacer una lista de expresiones comunes", "Usarlas en frases propias", "Mantener una charla escrita con un bot (ej. ChatGPT en inglés)"],
        ["Ver una película en inglés con subtítulos en inglés", "Hacer una lista de vocabulario avanzado", "Escribir una crítica"],
        ["Jugar un videojuego en inglés y describir la historia", "Explicar sus reglas en inglés", "Grabar un audio hablando de él"],
        ["Unirte a un foro de discusión en inglés", "Publicar y responder a comentarios", "Aprender vocabulario de ese tema"],
        ["Dar una presentación oral sobre un tema (grabada)", "Pedir feedback a alguien que hable inglés", "Aplicar correcciones"],
        ["Mantener una conversación de 20 minutos con una persona nativa", "Escribir un resumen de esa conversación", "Identificar y estudiar tus errores"]
      ]
    }
  ],
};

const usuarioHabilidades = {
  conocimiento: [],
  habilidades: [],
  idiomas: [],
  salud: [],
};

const contadores = {
  conocimiento: 0,
  habilidades: 0,
  idiomas: 0,
  salud: 0
};

let categoriaActual = null;

// 🧠 Inicializar totales disponibles
function contarTotalesDisponibles() {
  for (let cat in habilidadesPorCategoria) {
    contadores[cat] = habilidadesPorCategoria[cat].length;
  }
}

// Crear el radar chart con valores iniciales
const ctx = document.getElementById('radarChart').getContext('2d');
const radarChart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['Conocimiento', 'Habilidades', 'Idiomas', 'Salud'],
    datasets: [{
      label: 'Progreso',
      data: [0, 0, 0, 0],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2
    }]
  },
  options: {
    responsive: false,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent'
        }
      }
    }
  }
});


function calcularNivelesRadar() {
  const categorias = ['conocimiento', 'habilidades', 'idiomas', 'salud'];

  return categorias.map(categoria => {
    const habilidadesUsuario = usuarioHabilidades[categoria] || [];

    // SOLO contar las que el usuario tiene
    const nivelMaximoPorHabilidad = 10;
    const nivelMaximoCategoria = habilidadesUsuario.length * nivelMaximoPorHabilidad;

    if (nivelMaximoCategoria === 0) return 0;

    const nivelesCompletados = habilidadesUsuario.reduce((total, h) => total + (h.nivel || 0), 0);
    return Math.round((nivelesCompletados / nivelMaximoCategoria) * 100);
  });
}

function actualizarRadar() {
  const progresoPorCategoria = calcularNivelesRadar();
  radarChart.data.datasets[0].data = progresoPorCategoria;
  radarChart.update();
}

// 🔢 Actualizar los contadores en pantalla
function actualizarContadoresDOM() {
  for (let cat in usuarioHabilidades) {
    const total = contadores[cat] ?? 0;
    const actual = usuarioHabilidades[cat].length;
    const span = document.getElementById(`contador-${cat}`);
    if (span) span.textContent = `${actual}/${total}`;
  }
}

function mostrarHabilidades(categoria) {
  categoriaActual = categoria;
  document.getElementById('zona-habilidades').style.display = 'block';
  document.getElementById('categorias').style.display = 'none';
  document.getElementById('titulo-categoria').textContent = "📂 " + categoria;
  const lista = document.getElementById('lista-habilidades');
  lista.innerHTML = '';

  usuarioHabilidades[categoria].forEach((hab, index) => {
    if (!hab.nivel) hab.nivel = 1;

    const nivelActual = hab.nivel ?? 1;
    const misionesHtml = hab.misiones[nivelActual - 1]?.map((m, i) => `
      <li><label><input type="checkbox" data-i="${i}" data-index="${index}"> ${m}</label></li>
    `).join('') || '<li>No hay misiones para este nivel</li>';

    const div = document.createElement('div');
    div.className = 'habilidad';
    div.dataset.index = index;

    div.innerHTML = `
      <h3>${hab.nombre}</h3>
      <div class="nivel">Nivel ${hab.nivel}</div>
      <ul class="misiones">${misionesHtml}</ul>
      <button class="subir" data-index="${index}">Subir de Nivel</button>
    `;

    lista.appendChild(div);
  });

  document.querySelectorAll('.misiones input').forEach(cb => {
    cb.addEventListener('change', actualizarBoton);
  });

  document.querySelectorAll('.subir').forEach(btn => {
    btn.addEventListener('click', () => subirNivel(btn.dataset.index));
  });

  actualizarContadoresDOM();
}

function volver() {
  document.getElementById('zona-habilidades').style.display = 'none';
  document.getElementById('categorias').style.display = 'grid';
  actualizarContadoresDOM();
}

document.getElementById('agregar-habilidad').addEventListener('click', () => {
  const popup = document.getElementById('popup');
  const lista = document.getElementById('lista-popup');
  lista.innerHTML = '';

  const disponibles = habilidadesPorCategoria[categoriaActual].filter(hab => {
    return !usuarioHabilidades[categoriaActual].some(h => h.nombre === hab.nombre);
  });

  if (disponibles.length === 0) {
    lista.innerHTML = "<li>No hay más habilidades disponibles</li>";
  } else {
    disponibles.forEach(hab => {
      const li = document.createElement('li');
      li.innerHTML = `<label><input type="checkbox" value="${hab.nombre}"> ${hab.nombre}</label>`;
      lista.appendChild(li);
    });

    const confirmar = document.createElement('button');
    confirmar.textContent = "Añadir seleccionadas";
    confirmar.onclick = () => {
      const seleccionadas = lista.querySelectorAll('input[type="checkbox"]:checked');
      seleccionadas.forEach(input => {
        const habilidad = habilidadesPorCategoria[categoriaActual].find(h => h.nombre === input.value);
        const copia = JSON.parse(JSON.stringify(habilidad));
        copia.nivel = 1;
        usuarioHabilidades[categoriaActual].push(copia);
      });
      cerrarPopup();
      mostrarHabilidades(categoriaActual);
    };
    lista.appendChild(confirmar);
  }

  popup.style.display = 'flex';
});

function cerrarPopup() {
  document.getElementById('popup').style.display = 'none';
}

function actualizarBoton() {
  document.querySelectorAll('.habilidad').forEach(div => {
    const index = div.dataset.index;
    const checks = div.querySelectorAll('input[type="checkbox"]');
    const completos = Array.from(checks).every(cb => cb.checked);
    const btn = div.querySelector('.subir');
    btn.classList.toggle('visible', completos);
  });
}

// Función que actualiza el radar con los nuevos datos

// Función para subir de nivel una habilidad y actualizar el radar
function subirNivel(index) {
  // Obtener la habilidad que corresponde al índice
  const habilidad = usuarioHabilidades[categoriaActual][index];
  
  // Si la habilidad no ha alcanzado el nivel máximo (10), aumentamos su nivel
  if (habilidad.nivel < 10) {
    habilidad.nivel++;  // Subir el nivel de la habilidad
    actualizarRadar();  // Actualizar el radar con los nuevos datos
  }
  
  // Actualizar la interfaz de usuario (mostrar habilidades actualizadas)
  mostrarHabilidades(categoriaActual);
  
  // Animación de subida de nivel
  setTimeout(() => {
    const div = document.querySelector(`.habilidad[data-index="${index}"]`);
    if (div) {
      div.classList.add("level-up-anim");
      lanzarConfettiSobre(div);
      setTimeout(() => div.classList.remove("level-up-anim"), 1000);
    }
  }, 100);
}


document.querySelectorAll('.categoria').forEach(cat => {
  cat.addEventListener('click', () => {
    mostrarHabilidades(cat.dataset.categoria);
  });
});

function lanzarConfettiSobre(element) {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  element.style.position = 'relative';
  element.appendChild(container);

  const colors = ['#ff4d4d', '#4dff88', '#4da6ff', '#ffc04d', '#b84dff'];

  for (let i = 0; i < 25; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = `${Math.random() * 0.5 + 0.8}s`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(confetti);
  }

  setTimeout(() => {
    container.remove();
  }, 1500);
}


// 🚀 Arranque: cargar totales y actualizar contadores
contarTotalesDisponibles();
actualizarContadoresDOM();
actualizarRadar(); // <- Esta solo funcionará después de definir `radarChart`

