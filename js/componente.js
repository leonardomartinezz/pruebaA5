// DSX Modal — componente.js
// Componente visual reutilizable para ventanas modales.

// Clase principal del componente
class DSXModal {
  
  // Guarda la configuración que le pasamos al crear el modal
  constructor(opciones = {}) {
    this.opciones = opciones; // Guarda los textos, botones, etc.
    this._fondo = null; // Variable para guardar el HTML del fondo del modal
    this._keyHandler = this._keyHandler.bind(this); // Prepara la función para la tecla ESC
  }

  // Atajo rápido para crear y abrir el modal en una sola línea
  static show(opciones) {
    const modal = new DSXModal(opciones);
    modal.abrir();
    return modal;
  }

  // Arma toda la estructura HTML del modal usando JavaScript
  _construir() {
    // Saca los valores de la configuración (con valores por defecto si no existen)
    const {
      tipo = 'info',
      icono = '',
      etiqueta = '',
      titulo = '',
      mensaje = '',
      contenidoHTML = '',
      badge = null,
      botones = [],
      cerrable = true,
    } = this.opciones;

    // Crea el fondo oscuro que cubre toda la pantalla
    const fondo = document.createElement('div');
    fondo.className = 'dsx-modal-fondo';
    fondo.setAttribute('role', 'dialog');
    fondo.setAttribute('aria-modal', 'true');

    // Crea la caja principal blanca del modal
    const caja = document.createElement('div');
    caja.className = 'dsx-modal-caja';

    // Agrega el botón de cerrar (la tachita X) en la esquina si es cerrable
    if (cerrable) {
      const btnCerrar = document.createElement('button');
      btnCerrar.className = 'dsx-modal-cerrar';
      btnCerrar.setAttribute('aria-label', 'Cerrar');
      btnCerrar.innerHTML = '&times;';
      btnCerrar.addEventListener('click', () => this.cerrar());
      caja.appendChild(btnCerrar);
    }

    // Agrega el texto pequeño arriba del título (ej. "Resultado")
    if (etiqueta) {
      const elEtiqueta = document.createElement('div');
      elEtiqueta.className = 'dsx-modal-etiqueta';
      elEtiqueta.textContent = etiqueta;
      caja.appendChild(elEtiqueta);
    }

    // Agrega el ícono o emoji
    if (icono) {
      const elIcono = document.createElement('div');
      elIcono.className = `dsx-modal-icono dsx-${tipo}`;
      elIcono.textContent = icono;
      caja.appendChild(elIcono);
    }

    // Agrega el título principal del modal
    if (titulo) {
      const elTitulo = document.createElement('h3');
      elTitulo.className = 'dsx-modal-titulo';
      elTitulo.textContent = titulo;
      caja.appendChild(elTitulo);
    }

    // Agrega contenido HTML personalizado o un mensaje de texto simple
    if (contenidoHTML) {
      const elContenido = document.createElement('div');
      elContenido.className = 'dsx-modal-contenido';
      elContenido.innerHTML = contenidoHTML;
      caja.appendChild(elContenido);
    } else if (mensaje) {
      const elMensaje = document.createElement('p');
      elMensaje.className = 'dsx-modal-mensaje';
      elMensaje.textContent = mensaje;
      caja.appendChild(elMensaje);
    }

    // Agrega la etiquetita de color (badge) si la configuramos
    if (badge) {
      const elBadge = document.createElement('span');
      elBadge.className = `dsx-badge dsx-${badge.tipo || 'info'}`;
      elBadge.textContent = badge.texto || '';
      caja.appendChild(elBadge);
    }

    // Dibuja los botones que hayamos configurado (ej. Aceptar, Cancelar)
    if (botones.length) {
      const elBotones = document.createElement('div');
      elBotones.className = 'dsx-modal-botones';
      
      // Recorre la lista de botones y los va creando uno por uno
      botones.forEach((btn) => {
        const elBtn = document.createElement('button');
        elBtn.className = `dsx-boton dsx-boton-${btn.tipo || 'primario'}`;
        elBtn.textContent = btn.texto || 'Aceptar';
        
        // Le dice al botón qué hacer al darle clic
        elBtn.addEventListener('click', () => {
          if (typeof btn.onClick === 'function') btn.onClick(this);
        });
        elBotones.appendChild(elBtn);
      });
      caja.appendChild(elBotones);
    }

    // Permite cerrar el modal haciendo clic en el fondo oscuro
    if (cerrable) {
      fondo.addEventListener('click', (e) => {
        if (e.target === fondo) this.cerrar();
      });
    }

    // Mete la caja dentro del fondo y regresa todo el bloque armado
    fondo.appendChild(caja);
    return fondo;
  }

  // Revisa si el usuario presiona la tecla Escape (ESC) para cerrarlo
  _keyHandler(e) {
    if (e.key === 'Escape' && this.opciones.cerrable !== false) {
      this.cerrar();
    }
  }

  // Mete el modal a la página para que el usuario lo vea
  abrir() {
    if (this._fondo) return; // Si ya está abierto, no hace nada
    
    this._fondo = this._construir(); // Construye el HTML
    document.body.appendChild(this._fondo); // Lo pega en el body de la página
    document.addEventListener('keydown', this._keyHandler); // Escucha el teclado

    // Hace una pequeña pausa para que la animación de entrada se vea fluida
    requestAnimationFrame(() => {
      this._fondo.classList.add('dsx-activo');
    });

    return this;
  }

  // Oculta el modal y lo borra del HTML para no dejar basura
  cerrar() {
    if (!this._fondo) return; // Si no hay modal, no hace nada
    
    this._fondo.classList.remove('dsx-activo'); // Quita la clase para la animación de salida
    document.removeEventListener('keydown', this._keyHandler); // Deja de escuchar el teclado

    const nodo = this._fondo;
    this._fondo = null;

    // Espera a que termine la animación para borrar el HTML por completo
    nodo.addEventListener('transitionend', () => nodo.remove(), { once: true });
    
    // Un respaldo por si la animación falla, lo borra a los 400ms
    setTimeout(() => nodo.remove(), 400);

    // Si le configuramos una acción extra al cerrar, la ejecuta aquí
    if (typeof this.opciones.onCerrar === 'function') {
      this.opciones.onCerrar();
    }
  }
}

// Hace que el modal funcione al importarlo con un <script> en el HTML
if (typeof window !== 'undefined') {
  window.DSXModal = DSXModal;
}

// Hace que el modal funcione si usas un entorno con módulos (como Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DSXModal;
}