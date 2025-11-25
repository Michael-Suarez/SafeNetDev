const preguntas = [
  {
    pregunta: "¿Cuál es el objetivo principal de la fase de evaluación dentro del ciclo de vida de una vulnerabilidad?",
    opciones: {
      A: "Analizar impacto y probabilidad para determinar la criticidad real del fallo",
      B: "Clasificar únicamente cuántas vulnerabilidades existen en el sistema",
      C: "Verificar si el parche ya está instalado correctamente",
      D: "Determinar qué usuarios tienen permisos administrativos"
    },
    correcta: "A"
  },
  {
    pregunta: "¿Qué actividad caracteriza la fase de remediación dentro del ciclo de manejo de vulnerabilidades?",
    opciones: {
      A: "Evaluar si es necesario externalizar la gestión de seguridad",
      B: "Organizar los fallos según su severidad y contexto operacional",
      C: "Monitorear continuamente la infraestructura para detectar nuevas amenazas",
      D: "Aplicar parches, corregir configuraciones o reemplazar componentes vulnerables"
    },
    correcta: "D"
  },
  {
    pregunta: "¿Cuál es la función principal de las métricas Base en el sistema CVSS?",
    opciones: {
      A: "Ajustar el puntaje según el entorno y la infraestructura específica de una empresa",
      B: "Considerar la disponibilidad de exploits públicos y la existencia de parches",
      C: "Determinar el impacto financiero estimado de un ataque exitoso",
      D: "Medir qué tan explotable es una vulnerabilidad e identificar su impacto sobre CIA"
    },
    correcta: "D"
  },
  {
    pregunta: "¿Cómo influyen las métricas Temporales dentro de un puntaje CVSS?",
    opciones: {
      A: "Ajustan el puntaje según factores dinámicos como madurez del exploit o disponibilidad de soluciones",
      B: "Evalúan el riesgo de forma fija y no cambian con el tiempo",
      C: "Determinan la prioridad del parche según el tipo de hardware afectado",
      D: "Calculan automáticamente el impacto en reputación de la empresa"
    },
    correcta: "A"
  },
  {
    pregunta: "¿Qué beneficio principal ofrece CVSS dentro de un programa de gestión de vulnerabilidades?",
    opciones: {
      A: "Automatizar completamente la remoción de amenazas sin intervención humana",
      B: "Garantizar que todas las vulnerabilidades críticas desaparezcan inmediatamente",
      C: "Proporcionar un puntaje uniforme para priorizar riesgos y tomar decisiones informadas",
      D: "Clasificar vulnerabilidades únicamente según el número de usuarios afectados"
    },
    correcta: "C"
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
  const num_modulo = 8; 
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
        <button class="botones_footer" onclick="location.href='pagina_40.html'">Siguiente</button>
      </div>
    `;
  } else {
    footerHtml = `
      <button class="botones_footer" onclick="location.href='pagina_39.html'">Reintentar</button>
    `;
  }

  footerCont.innerHTML = footerHtml;

  retro.textContent = "";  
  sig_btn.style.display = "none";
}

cargar_pregunta();