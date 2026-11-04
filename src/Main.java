import java.util.Scanner;

/**
 * AquaGuardian - Archivo principal de la aplicación.
 * Plataforma educativa de conservación marina.
 * Primera versión (consola): registro de usuarios y consulta de especies.
 */
public class Main {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ServicioUsuarios servicioUsuarios = new ServicioUsuarios();
        ServicioEspecies servicioEspecies = new ServicioEspecies();

        System.out.println("=== Bienvenido a AquaGuardian ===");

        // Funcionalidad 1: registro de usuario
        System.out.print("Nombre: ");
        String nombre = sc.nextLine();
        System.out.print("Correo: ");
        String correo = sc.nextLine();
        servicioUsuarios.registrar(nombre, correo, "USUARIO");
        System.out.println("Usuario registrado: " + nombre);

        // Funcionalidad 2: consulta de especies
        System.out.println("\nEspecies marinas disponibles:");
        for (Especie e : servicioEspecies.listar()) {
            System.out.println("- " + e.getNombre() + " (" + e.getHabitat() + ")");
        }

        System.out.print("\nEscribe el nombre de una especie para ver su detalle: ");
        Especie encontrada = servicioEspecies.buscarPorNombre(sc.nextLine());
        if (encontrada != null) {
            System.out.println(encontrada.getNombre() + ": " + encontrada.getDescripcion());
        } else {
            System.out.println("Especie no encontrada.");
        }
        sc.close();
    }
}
