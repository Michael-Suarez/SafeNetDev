const preguntas = [
  {
    pregunta: "¿Cuál de las siguientes características describe mejor el propósito central de DevOps?",
    opciones: {
      A: "Aumentar la cantidad de desarrolladores necesarios para un proyecto",
      B: "Permitir despliegues manuales más controlados",
      C: "Reemplazar completamente las tareas del equipo de operaciones",
      D: "Mejorar la colaboración y automatizar procesos para entregar software más rápido y confiable"
    },
    correcta: "D"
  },
  {
    pregunta: "¿Qué riesgo se reduce principalmente gracias a la Integración Continua (CI)?",
    opciones: {
      A: "Errores humanos durante el despliegue a producción",
      B: "Vulnerabilidades generadas por configuraciones inseguras en servidores",
      C: "Fallos que pasan inadvertidos debido a la falta de pruebas ejecutadas de forma recurrente",
      D: "Mal uso de dependencias externas"
    },
    correcta: "C"
  },
  {
    pregunta: "¿Cuál es una ventaja clave del Despliegue/Entrega Continua (CD) en comparación con un proceso tradicional?",
    opciones: {
      A: "Automatiza el paso a entornos de pruebas o producción, disminuyendo errores manuales",
      B: "Permite que los desarrolladores trabajen sin necesidad de usar repositorios",
      C: "Reduce la necesidad de ejecutar pruebas automáticas",
      D: "Hace innecesaria la supervisión del equipo de operaciones"
    },
    correcta: "A"
  },
  {
    pregunta: "¿Qué distingue a DevSecOps de DevOps en su enfoque de seguridad?",
    opciones: {
      A: "DevSecOps integra la seguridad desde el inicio y la convierte en responsabilidad compartida",
      B: "DevSecOps solo evalúa seguridad una vez el software está en producción",
      C: "DevSecOps asigna toda la responsabilidad de seguridad al equipo de operaciones",
      D: "DevSecOps prohíbe el uso de automatizaciones de seguridad para evitar riesgos"
    },
    correcta: "A"
  },
  {
    pregunta: "Dentro de DevSecOps, ¿qué práctica contribuye directamente a detectar fallos antes de que el software llegue a producción?",
    opciones: {
      A: "Eliminación de las pruebas automáticas para acelerar el ciclo",
      B: "Escaneo de dependencias y análisis continuo del código",
      C: "Centralización de funciones de seguridad en un único especialista",
      D: "Aplazar los controles de seguridad hasta el despliegue final"
    },
    correcta: "B"
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
  const num_modulo = 3;
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
        <button class="botones_footer" onclick="location.href='pagina_17.html'">Siguiente</button>
      </div>
    `;
  } else {
    footerHtml = `
      <button class="botones_footer" onclick="location.href='pagina_16.html'">Reintentar</button>
    `;
  }

  footerCont.innerHTML = footerHtml;

  retro.textContent = "";  
  sig_btn.style.display = "none";
}

cargar_pregunta();