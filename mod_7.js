const preguntas = [
  {
    pregunta: "¿Cuál es el principal propósito de las pruebas unitarias dentro del ciclo de desarrollo?",
    opciones: {
      A: "Verificar la interacción entre múltiples componentes de la aplicación",
      B: "Validar pequeñas unidades del código de forma aislada para asegurar que cada función cumpla su objetivo",
      C: "Evaluar la seguridad de la aplicación frente a ataques de inyección",
      D: "Revisar el comportamiento de la aplicación sin conocer su implementación interna"
    },
    correcta: "B"
  },
  {
    pregunta: "¿Qué distingue a una prueba de integración según la definición mencionada por IBM?",
    opciones: {
      A: "Se enfoca únicamente en la ejecución de rutas internas del código",
      B: "Se limita a validar interfaces gráficas sin revisar la lógica interna",
      C: "Verifica cómo interactúan varios componentes juntos y detecta errores derivados de esa combinación",
      D: "Evalúa el sistema completo solo después de su despliegue final"
    },
    correcta: "C"
  },
  {
    pregunta: "¿Qué característica define a una prueba de caja negra?",
    opciones: {
      A: "Su obligatoriedad dentro de todas las metodologías ágiles",
      B: "Su uso exclusivo en pruebas de integración avanzada",
      C: "Su análisis de estructuras, rutas y lógica interna del programa",
      D: "Su enfoque en entradas, salidas y comportamiento sin considerar el código interno"
    },
    correcta: "D"
  },
  {
    pregunta: "¿Cuál de los siguientes riesgos forma parte del OWASP Top 10 y debe ser considerado en pruebas de seguridad web?",
    opciones: {
      A: "Configuración incorrecta o insegura de los componentes de la aplicación",
      B: "Uso de protocolos cifrados como HTTPS",
      C: "Implementación de pruebas unitarias incompletas",
      D: "Exceso de modularidad en la arquitectura del software"
    },
    correcta: "A"
  },
  {
    pregunta: "¿Por qué el OWASP Top 10 es una guía relevante para testers y desarrolladores?",
    opciones: {
      A: "Porque clasifica únicamente vulnerabilidades relacionadas con hardware",
      B: "Porque indica los lenguajes de programación más seguros",
      C: "Porque elimina la necesidad de realizar pruebas de seguridad manuales",
      D: "Porque identifica las vulnerabilidades más críticas y guía buenas prácticas para proteger aplicaciones web"
    },
    correcta: "D"
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
  const num_modulo = 7;
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
        <button class="botones_footer" onclick="location.href='pagina_36.html'">Siguiente</button>
      </div>
    `;
  } else {
    footerHtml = `
      <button class="botones_footer" onclick="location.href='pagina_35.html'">Reintentar</button>
    `;
  }

  footerCont.innerHTML = footerHtml;

  retro.textContent = "";  
  sig_btn.style.display = "none";
}

cargar_pregunta();