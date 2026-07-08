document.getElementById("formLogin").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const correo = document.getElementById("correoLogin").value;
  const password = document.getElementById("passLogin").value;

  if (!Utileria.validarCorreo(correo) || !Utileria.validarPassword(password)) {
    DSXModal.show({
      tipo: 'error',
      icono: '✕',
      titulo: 'Acceso Denegado',
      mensaje: 'Correo inválido o la contraseña no cumple los requisitos (8 caracteres, mayúscula, minúscula, número y especial).',
      botones: [{ texto: 'Reintentar', tipo: 'primario', onClick: (m) => m.cerrar() }]
    });
    return;
  }

  // Guardar sesión y redirigir
  localStorage.setItem("usuarioLogueado", correo);
  
  DSXModal.show({
    tipo: 'exito',
    icono: '✓',
    titulo: 'Acceso Concedido',
    mensaje: 'Redirigiendo al sistema...',
    botones: [{ 
      texto: 'Entrar', 
      tipo: 'primario', 
      onClick: (m) => {
        m.cerrar();
        window.location.href = "index.html";
      } 
    }]
  });
})
// Validación en tiempo real para el Login
const inputCorreoLogin = document.getElementById("correoLogin");
const inputPassLogin = document.getElementById("passLogin");

inputCorreoLogin.addEventListener("input", function() {
  // Si no es válido y no está vacío, pone el cuadro rojo
  if (!Utileria.validarCorreo(this.value) && this.value.length > 0) {
    this.classList.add("is-invalid");
  } else {
    this.classList.remove("is-invalid"); // Lo quita si ya está bien
  }
});

inputPassLogin.addEventListener("input", function() {
  if (!Utileria.validarPassword(this.value) && this.value.length > 0) {
    this.classList.add("is-invalid");
  } else {
    this.classList.remove("is-invalid");
  }
});;