/**
 * Representa a un usuario de AquaGuardian.
 * El rol puede ser "USUARIO" o "ADMINISTRADOR".
 */
public class Usuario {
    private String nombre;
    private String correo;
    private String rol;

    public Usuario(String nombre, String correo, String rol) {
        this.nombre = nombre;
        this.correo = correo;
        this.rol = rol;
    }

    public String getNombre() { return nombre; }
    public String getCorreo() { return correo; }
    public String getRol() { return rol; }
}
