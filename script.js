const habilidadesPorCategoria = {
    conocimiento: [
      { nombre: "Lectura", nivel: 1, misiones: ["Leer 10 páginas", "Leer 3 días", "Comentar un libro"] },
      { nombre: "Historia", nivel: 1, misiones: ["Estudiar 1h", "Ver documental", "Escribir resumen"] }
    ],
    habilidades: [
      { nombre: "Cubo Rubik", nivel: 1, misiones: ["Resolver 1 cara", "Resolver 3 caras", "Resolver cubo"] },
      { nombre: "Ajedrez", nivel: 1, misiones: ["Jugar 3 partidas", "Leer aperturas", "Jugar con oponente"] }
    ],
    idiomas: [
      { nombre: "Inglés", nivel: 1, misiones: ["Ver serie en inglés", "Leer artículos", "Hablar con nativo"] }
    ],
    salud: [
      { nombre: "Yoga", nivel: 1, misiones: ["Hacer 10 min", "Aprender postura", "3 sesiones"] }
    ],
    creatividad: [
      { nombre: "Dibujo", nivel: 1, misiones: ["Bocetar algo", "Colorear", "Mostrar a alguien"] }
    ],
    social: [
      { nombre: "Empatía", nivel: 1, misiones: ["Escuchar activamente", "Ayudar a alguien", "Conversación profunda"] }
    ]
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
  
      const misionesHtml = hab.misiones.map((m, i) => `
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
    habilidad.nivel++;
    habilidad.misiones = [
      "Nueva misión 1",
      "Nueva misión 2",
      "Nueva misión 3"
    ];
  
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
  