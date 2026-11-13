/**
 * Configuración de la interfaz.
 *
 * esAdministrador es solo una condición temporal de interfaz: cuando se integre
 * el módulo de acceso al sistema, su valor vendrá de la autenticación real del
 * backend. NO es un mecanismo de seguridad.
 */
export const CONFIG = Object.freeze({
  nombreApp: 'AquaGuardian',
  esAdministrador: false,
});
