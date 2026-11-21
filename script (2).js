/* =====================================================
   DATOS: edita aquí para poner tus partidos, tablas y equipos.
   dia: 0 = hoy, -1 = ayer, 1 = mañana (se ajusta solo cada día)
   estado: "FIN", "EN VIVO" o la hora (ej. "3:00 p. m.")
   ===================================================== */
const EQUIPOS = {
  "Real Madrid":["RM","#ffffff","España"],
  "Barcelona":["FCB","#a50044","España"],
  "Atlético Madrid":["ATM","#cb3524","España"],
  "Manchester City":["MCI","#6cabdd","Inglaterra"],
  "Liverpool":["LIV","#c8102e","Inglaterra"],
  "Arsenal":["ARS","#ef0107","Inglaterra"],
  "Bayern Múnich":["FCB","#dc052d","Alemania"],
  "PSG":["PSG","#004170","Francia"],
  "Inter":["INT","#0068a8","Italia"],
  "Juventus":["JUV","#222222","Italia"],
  "Atlético Nacional":["NAC","#1a7a3a","Colombia"],
  "Millonarios":["MIL","#1d3f9f","Colombia"],
  "América de Cali":["AME","#d4202c","Colombia"],
  "Junior":["JUN","#e2231a","Colombia"],
  "Santa Fe":["SFE","#c8102e","Colombia"],
  "Once Caldas":["ONC","#7a7a7a","Colombia"],
  "Boca Juniors":["BOC","#0a3d91","Argentina"],
  "River Plate":["RIV","#d50000","Argentina"],
  "Flamengo":["FLA","#b30000","Brasil"],
  "Colombia":["COL","#f5c400","Selección"],
  "Argentina":["ARG","#74acdf","Selección"],
  "Brasil":["BRA","#009c3b","Selección"]
};

const PARTIDOS = [
  {dia:0,liga:"Liga BetPlay",local:"Atlético Nacional",visita:"Millonarios",gl:2,gv:1,estado:"EN VIVO",min:"67'"},
  {dia:0,liga:"Liga BetPlay",local:"Junior",visita:"América de Cali",estado:"6:10 p. m."},
  {dia:0,liga:"LaLiga",local:"Real Madrid",visita:"Barcelona",estado:"3:00 p. m."},
  {dia:0,liga:"Premier League",local:"Liverpool",visita:"Arsenal",estado:"11:30 a. m."},
  {dia:0,liga:"Serie A",local:"Inter",visita:"Juventus",estado:"1:45 p. m."},
  {dia:-1,liga:"Bundesliga",local:"Bayern Múnich",visita:"PSG",gl:3,gv:2,estado:"FIN"},
  {dia:-1,liga:"Liga BetPlay",local:"Santa Fe",visita:"Once Caldas",gl:1,gv:1,estado:"FIN"},
  {dia:1,liga:"Premier League",local:"Manchester City",visita:"Liverpool",estado:"10:00 a. m."},
  {dia:1,liga:"Liga Argentina",local:"Boca Juniors",visita:"River Plate",estado:"5:00 p. m."},
  {dia:1,liga:"Eliminatorias",local:"Colombia",visita:"Brasil",estado:"7:30 p. m."}
];

const TABLAS = {
  "Liga BetPlay":[["Atlético Nacional",10,7,2,1,12,23],["Millonarios",10,6,2,2,8,20],["Junior",10,5,3,2,5,18],["América de Cali",10,4,3,3,2,15],["Santa Fe",10,3,3,4,-2,12],["Once Caldas",10,2,2,6,-9,8]],
  "LaLiga":[["Real Madrid",12,9,2,1,15,29],["Barcelona",12,9,1,2,18,28],["Atlético Madrid",12,7,3,2,9,24]],
  "Premier League":[["Arsenal",12,8,3,1,14,27],["Manchester City",12,8,2,2,16,26],["Liverpool",12,7,3,2,10,24]]
};

const DATOS = [
  "El primer Mundial se jugó en Uruguay en 1930.",
  "Brasil es el único país que ha jugado todos los Mundiales.",
  "Colombia ganó su única Copa América en 2001, jugando de local.",
  "Just Fontaine marcó 13 goles en el Mundial de 1958.",
  "El balón oficial pesa entre 410 y 450 gramos.",
  "Un partido dura 90 minutos, más el tiempo añadido por el árbitro."
];

/* =============== CÓDIGO (no necesitas tocarlo) =============== */
let diaActivo = 0, ligaActiva = "Todas", tablaActiva = Object.keys(TABLAS)[0], indiceDato = 0;

const $ = id => document.getElementById(id);

function escudo(nombre){
  const e = EQUIPOS[nombre] || [nombre.slice(0,3).toUpperCase(), "#555", ""];
  const color = e[1] === "#ffffff" ? "#9aa5b8" : e[1];
  return `<span class="escudo" style="background:${color}">${e[0]}</span>`;
}

function fechaDesplazada(n){
  const f = new Date(); f.setDate(f.getDate() + n); return f;
}

function mostrarBienvenida(){
  $("fecha-hoy").textContent = fechaDesplazada(0).toLocaleDateString("es-CO",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  $("texto").textContent = DATOS[0];
}

function pintarTabsDias(){
  const nombres = {"-1":"Ayer","0":"Hoy","1":"Mañana"};
  $("tabs-dias").innerHTML = [-1,0,1].map(d =>
    `<button class="${d===diaActivo?'activo':''}" onclick="elegirDia(${d})">${nombres[d]} ${fechaDesplazada(d).getDate()}</button>`).join("");
}
function elegirDia(d){ diaActivo = d; pintarTabsDias(); pintarPartidos(); }

function pintarFiltro(){
  const ligas = ["Todas", ...new Set(PARTIDOS.map(p => p.liga))];
  $("filtro-liga").innerHTML = ligas.map(l => `<option>${l}</option>`).join("");
  $("filtro-liga").onchange = e => { ligaActiva = e.target.value; pintarPartidos(); };
}

function pintarPartidos(){
  const lista = PARTIDOS.filter(p => p.dia === diaActivo && (ligaActiva === "Todas" || p.liga === ligaActiva));
  $("lista-partidos").innerHTML = lista.length ? lista.map(p => {
    const vivo = p.estado === "EN VIVO";
    const marcador = p.gl !== undefined;
    return `<div class="partido ${vivo?'vivo':''}">
      <div class="cab"><span>${p.liga}</span><span class="estado">${vivo ? "● EN VIVO " + (p.min||"") : p.estado}</span></div>
      <div class="fila-eq">${escudo(p.local)}<span class="nombre">${p.local}</span><span class="gol">${marcador?p.gl:""}</span></div>
      <div class="fila-eq">${escudo(p.visita)}<span class="nombre">${p.visita}</span><span class="gol">${marcador?p.gv:""}</span></div>
    </div>`;
  }).join("") : `<p class="vacio">No hay partidos para este día con ese filtro.</p>`;
}

function pintarTabla(){
  $("tabs-ligas").innerHTML = Object.keys(TABLAS).map(l =>
    `<button class="${l===tablaActiva?'activo':''}" onclick="elegirTabla('${l}')">${l}</button>`).join("");
  const filas = TABLAS[tablaActiva];
  $("cuerpo-tabla").innerHTML = filas.map((f,i) => {
    const clase = i < 3 ? "top" : (i >= filas.length-2 && filas.length > 4 ? "baja" : "");
    return `<tr class="${clase}"><td>${i+1}</td><td>${f[0]}</td><td>${f[1]}</td><td>${f[2]}</td><td>${f[3]}</td><td>${f[4]}</td><td>${f[5]}</td><td>${f[6]}</td></tr>`;
  }).join("");
}
function elegirTabla(l){ tablaActiva = l; pintarTabla(); }

function pintarEquipos(filtro=""){
  const q = filtro.toLowerCase();
  $("grid-equipos").innerHTML = Object.entries(EQUIPOS)
    .filter(([n,e]) => (n+" "+e[2]).toLowerCase().includes(q))
    .map(([n,e]) => `<div class="equipo">${escudo(n)}<h3>${n}</h3><p>${e[2]}</p></div>`).join("")
    || `<p class="vacio">No encontramos ese equipo.</p>`;
}

function cambiarTexto(){
  indiceDato = (indiceDato + 1) % DATOS.length;
  $("texto").textContent = DATOS[indiceDato];
}

function cambiarFondo(){ document.body.classList.toggle("claro"); }

document.addEventListener("DOMContentLoaded", () => {
  mostrarBienvenida();
  pintarTabsDias(); pintarFiltro(); pintarPartidos();
  pintarTabla(); pintarEquipos();
  $("buscador").addEventListener("input", e => pintarEquipos(e.target.value));
});
