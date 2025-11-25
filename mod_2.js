const preguntas = [
  {
    pregunta: "¿Cuál es el propósito principal del SSDLC dentro del proceso de desarrollo de software?",
    opciones: {
      A: "Reducir el tiempo de programación",
      B: "Integrar la seguridad en todas las fases del ciclo de desarrollo",
      C: "Eliminar la necesidad de pruebas",
      D: "Simplificar el diseño visual del software"
    },
    correcta: "B"
  },
  {
    pregunta: "Durante la fase de análisis en el SSDLC, uno de los riesgos más comunes es:",
    opciones: {
      A: "Requisitos incompletos o mal interpretados",
      B: "Uso inadecuado de colores en la interfaz",
      C: "Falta de compatibilidad con sistemas operativos",
      D: "Demasiada documentación"
    },
    correcta: "A"
  },
  {
    pregunta: "¿Qué actividad caracteriza la fase de desarrollo dentro del SSDLC?",
    opciones: {
      A: "Establecer la arquitectura del sistema",
      B: "Definir las necesidades del usuario",
      C: "Ejecutar pruebas funcionales y de seguridad",
      D: "Implementar código siguiendo estándares seguros y control de versiones"
    },
    correcta: "D"
  },
  {
    pregunta: "¿Qué riesgo corresponde a la fase de despliegue del SSDLC?",
    opciones: {
      A: "Acumulación de deuda técnica",
      B: "Configuraciones inseguras y mal manejo de accesos",
      C: "Interpretación errónea de los requisitos",
      D: "Uso de dependencias obsoletas durante la codificación"
    },
    correcta: "B"
  },
  {
    pregunta: "En la fase de pruebas, un riesgo frecuente es:",
    opciones: {
      A: "Falta de monitoreo continuo",
      B: "Arquitecturas inseguras",
      C: "Cobertura insuficiente o vulnerabilidades no detectadas",
      D: "Configuraciones débiles en producción"
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
  const num_modulo = 2;
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
        <button class="botones_footer" onclick="location.href='pagina_9.html'">Siguiente</button>
      </div>
    `;
  } else {
    footerHtml = `
      <button class="botones_footer" onclick="location.href='pagina_12.html'">Reintentar</button>
    `;
  }

  footerCont.innerHTML = footerHtml;

  retro.textContent = "";  
  sig_btn.style.display = "none";
}

cargar_pregunta();