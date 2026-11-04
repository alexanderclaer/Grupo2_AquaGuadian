import java.util.ArrayList;
import java.util.Scanner;

/**
 * AquaGuardian - Clase principal.
 * Plataforma educativa de conservación marina.
 * Primera versión: registro de usuarios y consulta de especies.
 */
public class Main {

    // Lista de usuarios registrados
    static ArrayList<String> usuarios = new ArrayList<>();

    // Especies de ejemplo (más adelante vendrán de una base de datos)
    static String[] especies = {
        "Tortuga marina - Océanos tropicales",
        "Ballena jorobada - Océanos templados y fríos",
        "Pez payaso - Arrecifes de coral"
    };

    // Registra un usuario nuevo
    static void registrarUsuario(String nombre) {
        usuarios.add(nombre);
        System.out.println("Usuario " + nombre + " registrado.");
    }

    // Muestra las especies disponibles
    static void listarEspecies() {
        System.out.println("Especies marinas:");
        for (String e : especies) {
            System.out.println("- " + e);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Bienvenido a AquaGuardian");
        System.out.print("Nombre: ");
        registrarUsuario(sc.nextLine());
        listarEspecies();
        sc.close();
    }
}
