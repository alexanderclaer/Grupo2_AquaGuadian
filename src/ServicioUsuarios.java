import java.util.ArrayList;

/**
 * Módulo de gestión de usuarios: registro e inicio de sesión.
 */
public class ServicioUsuarios {
    private ArrayList<Usuario> usuarios = new ArrayList<>();

    // Registra un usuario nuevo
    public void registrar(String nombre, String correo, String rol) {
        usuarios.add(new Usuario(nombre, correo, rol));
    }

    // Busca un usuario por correo (inicio de sesión básico)
    public Usuario iniciarSesion(String correo) {
        for (Usuario u : usuarios) {
            if (u.getCorreo().equalsIgnoreCase(correo)) {
                return u;
            }
        }
        return null;
    }
}
