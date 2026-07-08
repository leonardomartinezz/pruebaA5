const Utileria = {
  soloLetras: function(texto, permitirEspacios) {
    if (permitirEspacios) {
      return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(texto);
    } else {
      return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/.test(texto);
    }
  },

  validarCorreo: function(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  },

  validarLongitud: function(texto, longitudMinima) {
    return texto.length >= longitudMinima;
  },

  calcularEdad: function(fechaNacimiento) {
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  },

  esMayorDeEdad: function(fechaNacimiento) {
    const edad = this.calcularEdad(fechaNacimiento);
    return edad >= 18;
  },

  validarPassword: function(password) {
    let tieneMayus = /[A-Z]/.test(password);
    let tieneMinus = /[a-z]/.test(password);
    let tieneNumero = /[0-9]/.test(password);
    let tieneEspecial = /[^A-Za-z0-9]/.test(password);
    let tieneLongitud = password.length >= 8;

    return tieneMayus && tieneMinus && tieneNumero && tieneEspecial && tieneLongitud;
  },

  capitalizarNombre: function(nombre) {
    let palabras = nombre.split(" ");
    let resultado = [];
    for (let i = 0; i < palabras.length; i++) {
      if (palabras[i].length > 0) {
        let primeraLetra = palabras[i][0].toUpperCase();
        let restoPalabra = palabras[i].substring(1).toLowerCase();
        resultado.push(primeraLetra + restoPalabra);
      }
    }
    return resultado.join(" ");
  },

  validarTextosIguales: function(texto1, texto2) {
    return texto1 === texto2 && texto1 !== "";
  },

  validarCodigoPostal: function(cp) {
    let soloNumeros = cp.replace(/[^0-9]/g, "");
    return cp.length === 5 && soloNumeros.length === 5;
  },
  validarNumeroControl: function(numero) {
    let soloNumeros = numero.replace(/[^0-9]/g, "");
    return soloNumeros.length === 6;
  }
};