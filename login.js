// Tabs
document.getElementById('tab-login').addEventListener('click', () => activarTab('login'));
document.getElementById('tab-register').addEventListener('click', () => activarTab('register'));

function activarTab(tab) {
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-register').classList.toggle('active', tab === 'register');
  document.getElementById('form-login').classList.toggle('visible', tab === 'login');
  document.getElementById('form-register').classList.toggle('visible', tab === 'register');
}

// Registro
document.getElementById('form-register').addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('register-user').value.trim();
  const pass = document.getElementById('register-pass').value.trim();

  if (!user || !pass) {
    alert('Completa todos los campos');
    return;
  }

  if (localStorage.getItem(user)) {
    alert('Ese usuario ya existe');
    return;
  }

  localStorage.setItem(user, pass);
  localStorage.setItem('usuarioActivo', user);
  window.location.href = 'index.html';
});

// Login
document.getElementById('form-login').addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('login-user').value.trim();
  const pass = document.getElementById('login-pass').value.trim();

  const guardado = localStorage.getItem(user);
  if (guardado === pass) {
    localStorage.setItem('usuarioActivo', user);
    window.location.href = 'index.html';
  } else {
    alert('Usuario o contraseña incorrectos');
  }
});

// Invitado
document.getElementById('modo-invitado').addEventListener('click', () => {
  localStorage.setItem('usuarioActivo', 'invitado');
  window.location.href = 'index.html';
});
