document.addEventListener("DOMContentLoaded", () => {
  // 1. Validar si el usuario está logueado
  const usuario = localStorage.getItem("usuarioLogueado");
  if (!usuario) {
    window.location.href = "login.html"; // Si no hay sesión, regresarlo al login
  } else {
    // Mostrar nombre en el Navbar
    document.getElementById("nombreUsuarioNavbar").textContent = usuario;
  }

  // 2. Funcionalidad de Salir
  document.getElementById("btnSalir").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "login.html";
  });

  // 3. Validación de Captura de Alumno
  document.getElementById("formCaptura").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombreAlumno").value;
    const numControl = document.getElementById("numControl").value;
    const correo = document.getElementById("correoAlumno").value;
    const fechaNac = document.getElementById("fechaNac").value;

    // Validaciones con Utileria
    if (!Utileria.validarCorreo(correo)) {
      mostrarError('El correo ingresado no es válido.');
      return;
    }

    if (!Utileria.validarNumeroControl(numControl)) {
      mostrarError('El número de control debe tener exactamente 6 dígitos numéricos.');
      return;
    }

    // Modal de Edad
    const esMayor = Utileria.esMayorDeEdad(fechaNac);
    const edad = Utileria.calcularEdad(fechaNac);
    const nombreCap = Utileria.capitalizarNombre(nombre);

  if (esMayor) {
      DSXModal.show({
        tipo: 'exito',
        icono: '✓',
        titulo: 'Registro Exitoso',
        mensaje: `El alumno ${nombreCap} fue registrado. Es mayor de edad (${edad} años).`,
        botones: [{ 
          texto: 'Aceptar', 
          tipo: 'primario', 
          onClick: (m) => {
            m.cerrar();
            document.getElementById("formCaptura").reset(); // <-- Esto limpia los campos
            // También quitamos los bordes rojos o verdes si quedaron
            document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
          } 
        }]
      });
    } else {
      DSXModal.show({
        tipo: 'advertencia',
        icono: '?',
        titulo: 'Registro con Advertencia',
        mensaje: `El alumno ${nombreCap} es MENOR de edad (${edad} años).`,
        botones: [{ 
          texto: 'Entendido', 
          tipo: 'primario', 
          onClick: (m) => {
            m.cerrar();
            document.getElementById("formCaptura").reset(); // <-- Esto limpia los campos
            document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
          } 
        }]
      });
    }

  function mostrarError(mensaje) {
    DSXModal.show({
      tipo: 'error',
      icono: '✕',
      titulo: 'Error de validación',
      mensaje: mensaje,
      botones: [{ texto: 'Corregir', tipo: 'primario', onClick: (m) => m.cerrar() }]
    });
  }
})
// Validación en tiempo real para Captura de Alumnos
const inputNombre = document.getElementById("nombreAlumno");
const inputNumControl = document.getElementById("numControl");
const inputCorreoAlumno = document.getElementById("correoAlumno");

// Validar que el nombre solo tenga letras
inputNombre.addEventListener("input", function() {
  if (!Utileria.soloLetras(this.value, true) && this.value.length > 0) {
    this.classList.add("is-invalid");
  } else {
    this.classList.remove("is-invalid");
  }
});

// Validar que el número de control sean 6 dígitos
inputNumControl.addEventListener("input", function() {
  if (!Utileria.validarNumeroControl(this.value) && this.value.length > 0) {
    this.classList.add("is-invalid");
  } else {
    this.classList.remove("is-invalid");
  }
});

// Validar correo del alumno
inputCorreoAlumno.addEventListener("input", function() {
  if (!Utileria.validarCorreo(this.value) && this.value.length > 0) {
    this.classList.add("is-invalid");
  } else {
    this.classList.remove("is-invalid");
  }
});});