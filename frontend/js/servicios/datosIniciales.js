/**
 * Datos de ejemplo del parque. Más adelante serán reemplazados por las
 * respuestas del backend (Spring Boot + PostgreSQL). Tienen la misma forma que
 * los atributos de las clases Animal, Noticia y Evento del diagrama UML.
 */
export const DATOS_INICIALES = {
  animales: [
    {
      idAnimal: 1,
      nombre: 'Flipper',
      especie: 'Delfín nariz de botella',
      edad: 8,
      estado: 'saludable',
      nivelConservacion: 'Preocupación menor',
      zona: 'Piscina de Delfines',
      habitat: 'Océano Atlántico y costas caribeñas',
      descripcion: 'Un delfín muy sociable que disfruta interactuar con los visitantes.',
      situacionActual: 'Excelente estado de salud. Participa en el programa educativo del parque.',
      historia:
        'Flipper llegó al parque en 2020 tras ser rescatado de aguas contaminadas en el Caribe colombiano. Después de 18 meses de rehabilitación recuperó por completo su salud. Hoy ayuda a sensibilizar a los visitantes sobre la contaminación marina.',
    },
    {
      idAnimal: 2,
      nombre: 'Marina',
      especie: 'Tortuga verde',
      edad: 35,
      estado: 'en-cuidado',
      nivelConservacion: 'En peligro',
      zona: 'Área de Tortugas',
      habitat: 'Costas tropicales del Pacífico y del Caribe colombiano',
      descripcion: 'Una de las residentes más antiguas y queridas del parque.',
      situacionActual: 'Recuperándose de una lesión en el caparazón causada por redes de pesca.',
      historia:
        'Marina llegó herida en 2019 con una fractura profunda en el caparazón. El equipo veterinario realizó una cirugía de reconstrucción y hoy continúa su recuperación con una evolución positiva. Las tortugas verdes pueden vivir más de 80 años.',
    },
    {
      idAnimal: 3,
      nombre: 'Pepper',
      especie: 'Pingüino de Humboldt',
      edad: 5,
      estado: 'saludable',
      nivelConservacion: 'Vulnerable',
      zona: 'Zona Ártica',
      habitat: 'Corriente de Humboldt, costas de Perú y Chile',
      descripcion: 'El más juguetón de la colonia de pingüinos.',
      situacionActual: 'Saludable. Forma parte del programa de conservación de la especie.',
      historia:
        'Pepper nació en el programa de reproducción del parque. Es el más curioso de la colonia y siempre se acerca primero a los cuidadores a la hora de la alimentación.',
    },
    {
      idAnimal: 4,
      nombre: 'Luna',
      especie: 'Medusa luna',
      edad: 2,
      estado: 'saludable',
      nivelConservacion: 'Preocupación menor',
      zona: 'Acuario de Invertebrados',
      habitat: 'Océanos templados y subtropicales de todo el mundo',
      descripcion: 'Ayuda a explicar la importancia de los invertebrados marinos.',
      situacionActual: 'En perfecto estado. Hace parte de la exhibición educativa sobre invertebrados.',
      historia:
        'Luna es la protagonista de la exhibición sobre medusas. Estos animales llevan cientos de millones de años en los océanos y son indicadores importantes de la salud del mar.',
    },
    {
      idAnimal: 5,
      nombre: 'Thunder',
      especie: 'Tiburón martillo',
      edad: 12,
      estado: 'saludable',
      nivelConservacion: 'En peligro crítico',
      zona: 'Tanque de Tiburones',
      habitat: 'Aguas tropicales y templadas de todos los océanos',
      descripcion: 'Embajador de la conservación de los tiburones.',
      situacionActual: 'Saludable. Ayuda a cambiar la percepción negativa sobre los tiburones.',
      historia:
        'Thunder es el embajador del parque para explicar por qué los tiburones son esenciales para el equilibrio del océano. Su especie está en peligro crítico por la pesca excesiva.',
    },
    {
      idAnimal: 6,
      nombre: 'Simba',
      especie: 'León marino de California',
      edad: 10,
      estado: 'en-cuidado',
      nivelConservacion: 'Preocupación menor',
      zona: 'Plataforma de Mamíferos',
      habitat: 'Costas del Pacífico norteamericano',
      descripcion: 'Rescatado desnutrido, hoy recupera su peso ideal.',
      situacionActual: 'En recuperación por desnutrición. Su progreso es excelente.',
      historia:
        'Simba fue rescatado en estado de desnutrición severa. Con una dieta supervisada y seguimiento veterinario diario ha recuperado fuerza y ánimo.',
    },
  ],

  noticias: [
    {
      idNoticia: 1,
      titulo: 'Nacen tres crías de pingüino de Humboldt',
      categoria: 'Conservación',
      fechaPublicacion: '2026-03-01',
      destacada: true,
      resumen:
        'El parque celebra un hito para su programa de conservación: tres nuevas crías en la Zona Ártica.',
      contenido:
        'El equipo del parque celebra el nacimiento de tres crías de pingüino de Humboldt, una especie catalogada como vulnerable. Es un logro importante para el programa de reproducción en cautiverio.\n\nLos primeros exámenes confirman que las crías están en perfecto estado de salud, con buen peso y una respuesta óptima a la alimentación.\n\nPodrán observarse desde los miradores de la Zona Ártica a partir del próximo mes.',
    },
    {
      idNoticia: 2,
      titulo: 'Marina completa su rehabilitación',
      categoria: 'Rescate',
      fechaPublicacion: '2026-02-25',
      destacada: true,
      resumen: 'Tras años de cuidado, la tortuga verde se prepara para volver a su hábitat natural.',
      contenido:
        'Después de más de cuatro años de cuidado intensivo, Marina completó el proceso de rehabilitación de su caparazón. La fractura, causada por redes de pesca ilegales, requirió tres cirugías reconstructivas.\n\nEl siguiente paso será su liberación monitoreada en aguas protegidas, con un transmisor satelital que permitirá seguir su recorrido.',
    },
    {
      idNoticia: 3,
      titulo: 'Nuevo programa educativo para escuelas',
      categoria: 'Educación',
      fechaPublicacion: '2026-02-15',
      destacada: false,
      resumen: 'Visitas guiadas y talleres gratuitos para grupos escolares de todo el país.',
      contenido:
        'El parque lanza un programa educativo para colegios con visitas guiadas, talleres y material de apoyo para docentes.\n\nLos grupos pueden inscribirse con anticipación y elegir temas como la contaminación por plásticos, los arrecifes de coral o las especies amenazadas.',
    },
    {
      idNoticia: 4,
      titulo: 'Simba avanza en su recuperación',
      categoria: 'Rescate',
      fechaPublicacion: '2026-02-10',
      destacada: false,
      resumen: 'El león marino rescatado recupera peso y energía gracias a su dieta supervisada.',
      contenido:
        'Simba llegó desnutrido y hoy muestra un progreso excelente. El equipo veterinario ajustó su dieta y lo acompaña a diario.\n\nSi continúa así, podrá volver a participar en las exhibiciones en los próximos meses.',
    },
    {
      idNoticia: 5,
      titulo: 'Un sistema de filtración que ahorra agua',
      categoria: 'Conservación',
      fechaPublicacion: '2026-04-12',
      destacada: false,
      resumen: 'La nueva planta de tratamiento reduce el consumo de agua de los tanques del parque.',
      contenido:
        'El parque instaló un nuevo sistema de filtración que permite reutilizar gran parte del agua de los tanques, reduciendo el consumo y el impacto ambiental.\n\nLa mejora también ayuda a mantener una calidad de agua más estable para los animales.',
    },
    {
      idNoticia: 6,
      titulo: 'Alianza con universidades para investigar',
      categoria: 'Educación',
      fechaPublicacion: '2026-05-20',
      destacada: false,
      resumen: 'Estudiantes e investigadores trabajarán junto al equipo del parque en proyectos marinos.',
      contenido:
        'El parque firmó una alianza con universidades para desarrollar proyectos de investigación sobre especies marinas y su conservación.\n\nLos estudiantes podrán realizar prácticas y aportar datos que ayudarán a proteger mejor a los animales.',
    },
  ],

  eventos: [
    {
      idEvento: 1,
      nombre: 'Exhibición: el mundo de las medusas',
      fecha: '2026-02-20',
      lugar: 'Acuario de Invertebrados',
      descripcion:
        'Muestra inmersiva con tanques de luz ultravioleta que resalta la bioluminiscencia de las medusas. Incluida en el tiquete general.',
    },
    {
      idEvento: 2,
      nombre: 'Taller de conservación para familias',
      fecha: '2026-12-05',
      lugar: 'Sala educativa',
      descripcion:
        'Actividad para niños y adultos sobre cómo reducir el uso de plásticos y proteger los océanos desde casa.',
    },
    {
      idEvento: 3,
      nombre: 'Jornada de limpieza de playas',
      fecha: '2027-01-16',
      lugar: 'Playa más cercana al parque',
      descripcion:
        'Voluntarios y el equipo del parque recogen residuos de la playa y aprenden cómo afectan a la fauna marina.',
    },
    {
      idEvento: 4,
      nombre: 'Día Mundial de los Océanos',
      fecha: '2027-06-08',
      lugar: 'Todo el parque',
      descripcion:
        'Jornada especial con charlas de cuidadores, alimentación comentada de los animales y actividades para todas las edades.',
    },
  ],
};
