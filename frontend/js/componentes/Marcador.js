import { h, iniciales } from '../utilidades/dom.js';
import { icono } from '../utilidades/iconos.js';

function foto(archivo, alt, fuente, autor, licencia) {
  return {
    url: new URL('../../assets/images/' + archivo + '.jpg', import.meta.url).href,
    alt,
    fuente: 'https://commons.wikimedia.org/wiki/File:' + fuente,
    autor,
    licencia,
  };
}

export const FOTO_PORTADA = foto('tortuga-verde', 'Tortuga verde nadando bajo el agua en Kona', 'Green_turtle_in_Kona_2008.jpg', 'Brocken Inaglory', 'BY-SA 3.0');
const delfin = foto('delfin', 'Delfín nariz de botella en la estela de una embarcación', 'Tursiops_truncatus_01.jpg', 'NASA', 'Dominio público en EE. UU.');
const pinguino = foto('pinguino', 'Ejemplar de pingüino de Humboldt', 'Penguin_Spheniscus_humboldti.jpg', 'Ruf Korniienko y Grylitska', 'BY-SA 4.0');
const medusa = foto('medusa', 'Medusa luna bajo el agua', 'Moon_jellyfish_-_Aurelia_aurita.jpg', 'Paucabot', 'BY-SA 3.0');
const tiburon = foto('tiburon', 'Tiburón martillo bajo el agua', 'Sphyrna_mokarran_head.jpg', 'Dave M', 'BY 2.0');
const leon = foto('leon-marino', 'Ejemplar de león marino de California', 'Zalophus_californianus.jpg', 'PDPhoto.org (fuente original)', 'Dominio público / CC0');

const POR_ESPECIE = new Map([
  ['delfín nariz de botella', delfin],
  ['tortuga verde', FOTO_PORTADA],
  ['pingüino de humboldt', pinguino],
  ['medusa luna', medusa],
  ['tiburón martillo', tiburon],
  ['león marino de california', leon],
]);

const NOTICIAS = new Map([[1, pinguino], [2, FOTO_PORTADA], [4, leon]]);
const EVENTOS = new Map([[1, medusa], [4, FOTO_PORTADA]]);

function agregarImagen(marco, datos, respaldo, { prioritaria = false, alt = datos.alt, credito } = {}) {
  const imagen = h('img', {
    alt,
    decoding: 'async',
    loading: prioritaria ? 'eager' : 'lazy',
    fetchpriority: prioritaria ? 'high' : null,
    enError: () => {
      imagen.remove();
      credito?.remove();
      respaldo.hidden = false;
    },
  });
  respaldo.hidden = true;
  imagen.src = datos.url;
  marco.append(imagen);
}

function Credito({ fuente, autor, licencia }, texto) {
  const [tipo, version] = licencia.split(' ');
  const enlaceLicencia = tipo.startsWith('BY')
    ? h('a', { href: 'https://creativecommons.org/licenses/' + tipo.toLowerCase() + '/' + version + '/' }, 'CC ' + licencia)
    : licencia === 'Dominio público / CC0'
      ? h('a', { href: 'https://creativecommons.org/publicdomain/zero/1.0/' }, licencia)
      : licencia;
  return h('figcaption', { clase: 'marcador__credito' }, texto, ' · ', h('a', { href: fuente }, autor), ' · ', enlaceLicencia);
}

export function MedioMarino(datos, { respaldo, zona, prioritaria = false, texto = 'Foto representativa', clase = '' } = {}) {
  const sustituto = h('div', { clase: 'marcador__respaldo', 'aria-hidden': 'true' }, respaldo);
  const marco = h('div', { clase: 'marcador__visual' }, sustituto,
    zona && h('span', { clase: 'marcador__zona' }, icono('ubicacion', 14), zona));
  const figura = h('figure', { clase: ['marcador', clase].filter(Boolean).join(' ') }, marco);
  if (datos) {
    const credito = Credito(datos, texto);
    figura.append(credito);
    agregarImagen(marco, datos, sustituto, { prioritaria, credito });
  }
  return figura;
}

function fotoAnimal(animal) {
  return POR_ESPECIE.get(animal.especie.trim().toLocaleLowerCase('es'));
}

export function MarcadorAnimal(animal) {
  return MedioMarino(fotoAnimal(animal), {
    respaldo: iniciales(animal.especie),
    zona: animal.zona,
  });
}

export function MiniaturaAnimal(animal) {
  const respaldo = h('span', {}, iniciales(animal.especie));
  const circulo = h('span', { clase: 'mini-animal__circulo', 'aria-hidden': 'true' }, respaldo);
  const datos = fotoAnimal(animal);
  if (datos) agregarImagen(circulo, datos, respaldo, { alt: '' });
  return circulo;
}

export function MarcadorNoticia(noticia) {
  return MedioMarino(NOTICIAS.get(noticia.idNoticia), { respaldo: icono('periodico', 36) });
}

export function MarcadorEvento(evento) {
  return MedioMarino(EVENTOS.get(evento.idEvento), { respaldo: icono('calendario', 36) });
}
