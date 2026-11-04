import java.util.ArrayList;

/**
 * Módulo de especies y hábitats: consulta del catálogo.
 * Por ahora los datos son de ejemplo; luego vendrán de PostgreSQL.
 */
public class ServicioEspecies {
    private ArrayList<Especie> especies = new ArrayList<>();

    public ServicioEspecies() {
        especies.add(new Especie("Tortuga marina", "Océanos tropicales", "Reptil marino que migra largas distancias."));
        especies.add(new Especie("Ballena jorobada", "Océanos templados y fríos", "Mamífero marino conocido por sus cantos."));
        especies.add(new Especie("Pez payaso", "Arrecifes de coral", "Vive en simbiosis con las anémonas."));
    }

    public ArrayList<Especie> listar() {
        return especies;
    }

    // Busca una especie por nombre
    public Especie buscarPorNombre(String nombre) {
        for (Especie e : especies) {
            if (e.getNombre().equalsIgnoreCase(nombre)) {
                return e;
            }
        }
        return null;
    }
}
