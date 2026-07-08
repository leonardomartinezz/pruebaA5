
   //Comportamiento de los botones
   // Función para mostrar un modal de éxito (cuando todo sale bien)
    function demoExito() {
      DSXModal.show({
        tipo: 'exito',
        icono: '✓', 
        etiqueta: 'Resultado', 
        titulo: 'Verificación completa',
        mensaje: 'Los datos ingresados son válidos y fueron guardados correctamente.',
        badge: { texto: 'Éxito', tipo: 'exito' }, 
        botones: [
          // Botón principal que al darle clic ejecuta la función de cerrar
          { texto: 'Aceptar', tipo: 'primario', onClick: (m) => m.cerrar() }
        ]
      });
    }

    // Función para mostrar un modal de error (cuando algo falla)
    function demoError() {
      DSXModal.show({
        tipo: 'error',
        icono: '✕',
        etiqueta: 'Atención',
        titulo: 'No se pudo procesar',
        mensaje: 'Revisa los campos marcados en rojo e inténtalo de nuevo.',
        badge: { texto: 'Error de validación', tipo: 'error' },
        botones: [

          // Botón para cerrar la ventana y dejar al usuario corregir los datos
          { texto: 'Reintentar', tipo: 'primario', onClick: (m) => m.cerrar() }
        ]
      });
    }

    // Función para un modal de advertencia que te da dos opciones a elegir
    function demoConfirmacion() {
      DSXModal.show({
        tipo: 'advertencia', 
        icono: '?',
        titulo: '¿Eliminar cuenta?',
        mensaje: 'Esta acción no se puede deshacer. Se borrarán todos tus datos.',
        botones: [
          // Primer botón (secundario) que solo cancela y cierra
          { texto: 'Cancelar', tipo: 'secundario', onClick: (m) => m.cerrar() },
          // Segundo botón (primario) que cierra este modal y abre el de éxito como demostración
          { texto: 'Eliminar', tipo: 'primario', onClick: (m) => {
              m.cerrar();
              setTimeout(demoExito, 350); 
            }
          }
        ]
      });
    }

    // Función para un modal donde metemos código HTML directamente
    function demoContenidoLibre() {
      DSXModal.show({
        etiqueta: 'Newsletter',
        titulo: 'Suscríbete',
        cerrable: true, 
        // En lugar de 'mensaje', usamos 'contenidoHTML' para inyectar una caja de texto (input)
        contenidoHTML: `
          <p style="margin-bottom:10px;color:#64748b;">Recibe novedades una vez al mes.</p>
          <input type="email" placeholder="tu@correo.com"
                 style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:6px;font-size:14px;">
        `,
        botones: [
          // Botón simple para cerrar el modal
          { texto: 'Suscribirme', tipo: 'primario', onClick: (m) => m.cerrar() }
        ]
      });
    }