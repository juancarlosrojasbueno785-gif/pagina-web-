const datos = [
  "El primer Mundial se jugó en Uruguay en 1930.",
  "Brasil es el único país que ha jugado todos los Mundiales.",
  "Un partido dura 90 minutos, más el tiempo añadido.",
  "Colombia ganó su única Copa América en 2001, como local.",
  "Just Fontaine marcó 13 goles en el Mundial de 1958, un récord que sigue en pie.",
  "El balón oficial pesa entre 410 y 450 gramos."
];
let indice = 0;

const fondos = ["", "tarde", "noche"];
let fondoActual = 0;

function mostrarBienvenida() {
  const hora = new Date().getHours();
  let saludo = "Buenas noches";
  if (hora < 12) saludo = "Buenos días";
  else if (hora < 19) saludo = "Buenas tardes";
  document.getElementById("texto").textContent =
    saludo + ", bienvenido a Mundo Fútbol. Aquí encontrarás ligas, leyendas y datos del deporte rey.";
}

function cambiarTexto() {
  document.getElementById("texto").textContent = datos[indice];
  indice = (indice + 1) % datos.length;
}

function cambiarFondo() {
  fondoActual = (fondoActual + 1) % fondos.length;
  document.body.className = fondos[fondoActual];
}
