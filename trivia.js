const preguntas = [
  { texto: "¿Quién es el máximo goleador en la historia de los mundiales de fútbol?", opciones: ["Diego Maradona","Miroslav Klose","Cristiano Ronaldo","Pelé"], correcta: 1 },
  { texto: "¿Cuál es la competición de clubes más importante del mundo?", opciones: ["Copa América","Eurocopa","Liga de Campeones (Champions League)","Copa Libertadores"], correcta: 2 },
  { texto: "¿Qué selección ha ganado más Copas del Mundo?", opciones: ["Alemania","Brasil","Argentina","Italia"], correcta: 1 },
  { texto: "¿Quién es conocido como “La Pulga”?", opciones: ["Neymar","Ronaldinho","Lionel Messi","Ángel Di María"], correcta: 2 },
  { texto: "¿En qué país se jugó la primera Copa Mundial de Fútbol?", opciones: ["Italia","Uruguay","Argentina","Inglaterra"], correcta: 1 },
  { texto: "¿Cuál es el equipo con más títulos de Champions League?", opciones: ["AC Milan","Real Madrid","Bayern Múnich","Barcelona"], correcta: 1 },
  { texto: "¿En qué año ganó España su primera Copa del Mundo?", opciones: ["2014","2010","2006","2002"], correcta: 1 },
  { texto: "¿Qué país ganó el Mundial de 2022?", opciones: ["Francia","Alemania","Brasil","Argentina"], correcta: 3 },
  { texto: "¿Qué jugador tiene más Balones de Oro?", opciones: ["Pelé","Diego Maradona","Lionel Messi","Cristiano Ronaldo"], correcta: 2 },
  { texto: "¿Cuál es el apodo del futbolista colombiano Radamel Falcao?", opciones: ["El Tigre","El León","El Cazador","La Bestia"], correcta: 0 }
];

let nombreJugador = "";

let puntaje = 0;
let indice = 0;
let timer;
const DURACION = 15;
let tiempoRestante = DURACION;

let preguntaEl = document.getElementById('pregunta');
let numeroPreguntaEl = document.getElementById('numero-pregunta');
let botones = [
  document.getElementById('op1'),
  document.getElementById('op2'),
  document.getElementById('op3'),
  document.getElementById('op4')
];
let tiempoEl = document.getElementById('tiempo');

const barra = document.getElementById('barra-progreso');

const card = document.querySelector('.card');
const contenidoOriginalCard = card.innerHTML; // guardamos el contenido original

function iniciarQuiz() {
  mostrarPregunta();
}

function mostrarPregunta() {
  clearTimeout(timer);
  tiempoRestante = DURACION;
  tiempoEl.textContent = tiempoRestante;
  timer = setInterval(actualizarTemporizador, 1000);

  let q = preguntas[indice];
  numeroPreguntaEl.textContent = indice + 1;
  preguntaEl.textContent = q.texto;
  q.opciones.forEach((opt, i) => {
    botones[i].textContent = opt;
    botones[i].onclick = () => seleccionarOpcion(i);
  });
  barra.value = ((indice) / preguntas.length) * 100;
}

function actualizarTemporizador() {
  tiempoRestante--;
  tiempoEl.textContent = tiempoRestante;
  if (tiempoRestante <= 0) {
    clearInterval(timer);
    pasarSiguiente();
  }
}

function seleccionarOpcion(seleccion) {
  clearInterval(timer);
  if (seleccion === preguntas[indice].correcta) {
    puntaje += 5;
  }
  pasarSiguiente();
}

function pasarSiguiente() {
  indice++;
  if (indice < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
}

// function mostrarResultado() {
//   clearInterval(timer);
//   const card = document.querySelector('.card');
//   card.innerHTML = `
//     <h3 class='resultado_titulo'>Tu puntaje es:</h3>
//     <p class='resultado_obtenido'>${puntaje} puntos</p>
//     <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
//       <button id="btn-rejugar">Volver a Jugar</button>
//       <button id="btn-nuevo-usuario">Nuevo Usuario</button>
//     </div>
//     <div style="text-align: center; margin-top: 30px;">
//       <img src="https://upload.wikimedia.org/wikipedia/commons/0/02/Clapboard_icon.png" alt="Cine" width="100">
//     </div>
//   `;
//   barra.value = 100;

//   document.getElementById('btn-rejugar').addEventListener('click', volverAJugar);
//   document.getElementById('btn-nuevo-usuario').addEventListener('click', nuevoUsuario);
// }

function mostrarResultado() {
  clearInterval(timer);
  const card = document.querySelector('.card');
  card.innerHTML = `
    <h3 class='resultado_titulo animacion-zoom'>Resultados</h3>

    <p style="text-align: center" class='resultado_obtenido animacion-zoom'>${nombreJugador}, tu puntaje es: ${puntaje} puntos</p>


    <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
      <button style="text-align: center" id="btn-rejugar">Volver a Jugar</button>
      <button style="text-align: center" id="btn-nuevo-usuario">Nuevo Usuario</button>
    </div>
    <div style="text-align: center; margin-top: 30px;">
      <img class="animacion-zoom"src="https://previews.123rf.com/images/kgbobo/kgbobo1509/kgbobo150900001/44669489-jugador-de-f%C3%BAtbol-chilena-resumen-en-el-aire.jpg" alt="Jugador de fútbol chilena" width="200">
    </div>
  `;
  barra.value = 100;

  document.getElementById('btn-rejugar').addEventListener('click', volverAJugar);
  document.getElementById('btn-nuevo-usuario').addEventListener('click', nuevoUsuario);
}

// barra.value = 0;

// function volverAJugar() {
//   puntaje = 0;
//   indice = 0;
//   document.getElementById('pantalla-inicio').style.display = "block";
//   document.getElementById('quiz-container').style.display = "none";
//   document.getElementById('nombre-jugador').value = "";

//   // Restauramos la estructura original de la card
//   card.innerHTML = contenidoOriginalCard;
//   reconectarElementos(); // 🔧 reconectamos variables  
// }
function volverAJugar() {
  puntaje = 0;
  indice = 0;
  document.getElementById('pantalla-inicio').style.display = "block";
  document.getElementById('quiz-container').style.display = "none";
  document.getElementById('nombre-jugador').value = "";
  barra.value = 0;

  // Restauramos la estructura original y reconectamos
  card.innerHTML = contenidoOriginalCard;
  reconectarElementos();
}

function nuevoUsuario() {
  puntaje = 0;
  indice = 0;
  document.getElementById('pantalla-inicio').style.display = "block";
  document.getElementById('quiz-container').style.display = "none";
  document.getElementById('nombre-jugador').value = "";

  // Restauramos la estructura original de la card
  card.innerHTML = contenidoOriginalCard;
reconectarElementos(); // 🔧 reconectamos variables
}



document.addEventListener('DOMContentLoaded', () => { 
  document.getElementById('btn-continuar').addEventListener('click', () => {
    nombreJugador = document.getElementById('nombre-jugador').value.trim();
if (nombreJugador === "") {
  alert("Por favor, ingresa tu nombre.");
} else {
  document.getElementById('pantalla-inicio').style.display = "none";
  document.getElementById('quiz-container').style.display = "block";
  reconectarElementos();
  iniciarQuiz();
}
  });  
});


function reconectarElementos() {
  // Reconecta todos los elementos del DOM después de restaurar el HTML
  preguntaEl = document.getElementById('pregunta');
  numeroPreguntaEl = document.getElementById('numero-pregunta');
  botones[0] = document.getElementById('op1');
  botones[1] = document.getElementById('op2');
  botones[2] = document.getElementById('op3');
  botones[3] = document.getElementById('op4');
  tiempoEl = document.getElementById('tiempo');
}

  
  