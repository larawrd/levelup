const habilidadesPorCategoria = {
    conocimiento: [
      { 
        nombre: "Lectura", 
        nivel: 1, 
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
        nivel: 1, 
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
        nivel: 1, 
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
        nivel: 1, 
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
    // Puedes agregar las demás categorías de la misma forma
  };
  
  const usuarioHabilidades = {
    conocimiento: [],
    habilidades: [],
    idiomas: [],
    salud: [],
    creatividad: [],
    social: []
  };
  
  let categoriaActual = null;
  
  function mostrarHabilidades(categoria) {
    categoriaActual = categoria;
    document.getElementById('zona-habilidades').style.display = 'block';
    document.getElementById('categorias').style.display = 'none';
    document.getElementById('titulo-categoria').textContent = "📂 " + categoria;
    const lista = document.getElementById('lista-habilidades');
    lista.innerHTML = '';
  
    usuarioHabilidades[categoria].forEach((hab, index) => {
      const div = document.createElement('div');
      div.className = 'habilidad';
      div.dataset.index = index;
  
      const misionesHtml = hab.misiones[hab.nivel - 1].map((m, i) => `
        <li><label><input type="checkbox" data-i="${i}" data-index="${index}"> ${m}</label></li>
      `).join('');
  
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
  }
  
  function volver() {
    document.getElementById('zona-habilidades').style.display = 'none';
    document.getElementById('categorias').style.display = 'grid';
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
          usuarioHabilidades[categoriaActual].push(JSON.parse(JSON.stringify(habilidad))); // copia
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
  
  function subirNivel(index) {
    const habilidad = usuarioHabilidades[categoriaActual][index];
    if (habilidad.nivel < 10) {
      habilidad.nivel++;
    }
    
    mostrarHabilidades(categoriaActual);
  
    // Animación
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
  