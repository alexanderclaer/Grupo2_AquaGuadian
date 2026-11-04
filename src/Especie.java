/**
 * Representa una especie marina que se consulta en la plataforma.
 */
public class Especie {
    private String nombre;
    private String habitat;
    private String descripcion;

    public Especie(String nombre, String habitat, String descripcion) {
        this.nombre = nombre;
        this.habitat = habitat;
        this.descripcion = descripcion;
    }

    public String getNombre() { return nombre; }
    public String getHabitat() { return habitat; }
    public String getDescripcion() { return descripcion; }
}
