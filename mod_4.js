const preguntas = [
  {
    pregunta: "¿Cuál es una ventaja clave de usar Git y GitHub como herramientas de aseguramiento en el desarrollo de software?",
    opciones: {
      A: "Garantizan que ningún error llegue nunca a producción",
      B: "Evitan que los desarrolladores utilicen ramas separadas",
      C: "Permiten sustituir por completo la necesidad de realizar pruebas de software",
      D: "Facilitan la trazabilidad y control de cambios mediante historial verificable y revisión colaborativa"
    },
    correcta: "D"
  },
  {
    pregunta: "¿Por qué es importante redactar mensajes de commit claros y descriptivos en Git?",
    opciones: {
      A: "Para reducir el peso del repositorio en entornos distribuidos",
      B: "Porque permiten comprender la intención y el impacto del cambio, facilitando auditorías y revisiones futuras",
      C: "Para que GitHub genere automáticamente nuevas ramas basadas en el mensaje",
      D: "Porque los commits extensos aumentan la seguridad del repositorio"
    },
    correcta: "B"
  },
  {
    pregunta: "¿Cuál es un beneficio de usar estrategias de ramas como Git Flow o Trunk-Based Development?",
    opciones: {
      A: "Eliminar por completo la necesidad de revisiones de código",
      B: "Evitar que los desarrolladores trabajen en paralelo",
      C: "Mantener un flujo organizado donde cada rama tiene un propósito claro, mejorando escalabilidad y seguridad",
      D: "Permitir que cualquier cambio llegue a producción sin verificación previa"
    },
    correcta: "C"
  },
  {
    pregunta: "¿Cuál de las siguientes herramientas de GitHub ayuda específicamente a detectar credenciales expuestas o información sensible dentro del código?",
    opciones: {
      A: "Branch protection",
      B: "Pull request templates",
      C: "Code owners",
      D: "Secret scanning"
    },
    correcta: "D"
  },
  {
    pregunta: "¿Qué problema busca prevenir el uso de análisis de dependencias y alertas como Dependabot en GitHub?",
    opciones: {
      A: "El uso de bibliotecas vulnerables o desactualizadas que puedan comprometer la seguridad del proyecto",
      B: "La exposición accidental de scripts de automatización interna",
      C: "La duplicación de commits entre ramas",
      D: "La modificación del historial del repositorio por parte de los colaboradores"
    },
    correcta: "A"
  }
];

let contador = 0;
let puntuacion = 0;

const questi = document.getElementById("pregunta");
const retro = document.getElementById("retroalimentacion");
const sig_btn = document.getElementById("boton_sig_cuest");
const opcs_btns = document.querySelectorAll(".opc_btn");

function cargar_pregunta() 
{
  const q = preguntas[contador];
  questi.textContent = q.pregunta;

  document.getElementById("opcA").textContent = q.opciones.A;
  document.getElementById("opcB").textContent = q.opciones.B;
  document.getElementById("opcC").textContent = q.opciones.C;
  document.getElementById("opcD").textContent = q.opciones.D;

  retro.textContent = "";
  sig_btn.style.display = "none";

  opcs_btns.forEach(btn => {
    btn.disabled = false;
    btn.style.opacity = 1;
  });
}

opcs_btns.forEach(btn => 
{
  btn.addEventListener("click", () => {
    const seleccionada = btn.dataset.letter;
    const correcta = preguntas[contador].correcta;

    if (seleccionada === correcta) 
    {
        retro.textContent = "✔ Correcto";
        retro.style.color = "#2ecc71";
        retro.className = "text";
        retro.style.fontSize = "1.5vw";
        puntuacion++;
    } 
    else 
    {
        retro.textContent = "✘ Incorrecto";
        retro.style.color = "#e74c3c";
        retro.className = "text";
        retro.style.fontSize = "1.5vw";
    }

    opcs_btns.forEach(b => { b.disabled = true; b.style.opacity = .5; });
    sig_btn.style.display = "inline-block";
  });
});

sig_btn.addEventListener("click", () => {
  contador++;
    if (contador < preguntas.length) 
    {
        cargar_pregunta();
    } 
    else 
    {
        mostrar_resultados();
    }
});

function mostrar_resultados() 
{
  const num_modulo = 4;
  const aprobo = puntuacion >= 3;

  if (aprobo && typeof guard_progre_mod === 'function') 
  {
    guard_progre_mod(num_modulo, 100);
    guard_ult_pag(num_modulo);
  }

  const contenedor = document.getElementById("cuestionario");

  const avatarHtml = aprobo
    ? `
      <div id="avatar_res_mod">
        <video autoplay onclick="this.play()" src="assets/videos/avatar_res_apro.mp4"></video>
      </div>
    `
    : `
      <div id="avatar_res_mod">
        <video autoplay onclick="this.play()" src="assets/videos/avatar_res_repro.mp4"></video>
      </div>
    `;

  contenedor.innerHTML = `
    <h2 class="text" id="tit_res_cuest">Resultados del módulo</h2>
    <div class="text" id="res_cuest">
        <p>Tu puntaje: <strong>${puntuacion} de ${preguntas.length}</strong></p>
    </div>
    ${avatarHtml}
  `;

  const footerCont = document.querySelector('.footer_cuest');
  let footerHtml = "";

  if (aprobo) {
    footerHtml = `
      <div class="footer_2bot">
        <button class="botones_footer" onclick="location.href='pagina_4.html'">Menú</button>
        <button class="botones_footer" onclick="location.href='pagina_22.html'">Siguiente</button>
      </div>
    `;
  } else {
    footerHtml = `
      <button class="botones_footer" onclick="location.href='pagina_21.html'">Reintentar</button>
    `;
  }

  footerCont.innerHTML = footerHtml;

  retro.textContent = "";  
  sig_btn.style.display = "none";
}

cargar_pregunta();