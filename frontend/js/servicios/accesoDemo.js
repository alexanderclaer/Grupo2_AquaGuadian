export const CLAVE_DEMO = 'oceano-demo';
export const CORREO_ADMIN_DEMO = 'admin@aquaguardian.test';

const CLAVE_ALMACEN = 'aquaguardian.accesoDemo.v1';
const ADMIN = Object.freeze({
  nombre: 'Administración de demostración',
  correo: CORREO_ADMIN_DEMO,
  rol: 'admin',
});
const FORMATO_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function crearAccesoDemo(obtenerAlmacen) {
  function leer() {
    const estado = { cuentas: [], sesion: null };
    try {
      const valor = JSON.parse(obtenerAlmacen().getItem(CLAVE_ALMACEN));
      if (!Array.isArray(valor?.cuentas)) return estado;
      estado.cuentas = valor.cuentas.filter((cuenta) =>
        typeof cuenta?.nombre === 'string' && typeof cuenta.correo === 'string' &&
        cuenta.correo !== CORREO_ADMIN_DEMO);
      estado.sesion = valor.sesion;
    } catch {
      // El catálogo público sigue disponible si el almacenamiento falla.
    }
    return estado;
  }

  function guardar(estado) {
    try {
      obtenerAlmacen().setItem(CLAVE_ALMACEN, JSON.stringify(estado));
    } catch {
      throw new Error('El almacenamiento local no está disponible en este navegador.');
    }
  }

  function buscarCuenta(cuentas, correo) {
    if (correo === CORREO_ADMIN_DEMO) return ADMIN;
    const cuenta = cuentas.find((item) => item.correo === correo);
    return cuenta ? { nombre: cuenta.nombre, correo: cuenta.correo, rol: 'usuario' } : null;
  }

  return {
    registrar({ nombre, correo, clave }) {
      nombre = nombre.trim();
      correo = correo.trim().toLowerCase();
      if (!nombre || nombre.length > 80) throw new Error('Escribe un nombre ficticio de hasta 80 caracteres.');
      if (correo.length > 254 || !FORMATO_CORREO.test(correo)) throw new Error('Escribe un correo de demostración válido.');
      if (clave !== CLAVE_DEMO) throw new Error('Usa la contraseña pública de demostración.');

      const estado = leer();
      if (buscarCuenta(estado.cuentas, correo)) throw new Error('Este correo ya está registrado o está reservado.');
      estado.cuentas.push({ nombre, correo });
      guardar(estado);
    },
    iniciarSesion({ correo, clave }) {
      const estado = leer();
      const cuenta = buscarCuenta(estado.cuentas, correo.trim().toLowerCase());
      if (!cuenta || clave !== CLAVE_DEMO) throw new Error('Comprueba el correo registrado y la contraseña de demostración.');
      estado.sesion = cuenta.correo;
      guardar(estado);
    },
    cerrarSesion() {
      const estado = leer();
      estado.sesion = null;
      guardar(estado);
    },
    obtenerSesion() {
      const { cuentas, sesion } = leer();
      return buscarCuenta(cuentas, sesion);
    },
    esCambioDeSesion(evento) {
      return evento.key === CLAVE_ALMACEN || evento.key === null;
    },
  };
}
