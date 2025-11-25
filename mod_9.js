const preguntas = [
  {
    pregunta: "¿Cuál de los siguientes principios refleja mejor la ética profesional en ciberseguridad?",
    opciones: {
      A: "Utilizar herramientas ofensivas solo cuando se busca acelerar pruebas internas sin informar a nadie",
      B: "Priorizar la confidencialidad, actuar con integridad y reportar vulnerabilidades de forma responsable",
      C: "Mantener técnicas de explotación en secreto para obtener ventaja competitiva",
      D: "Acceder a información sensible siempre que sea técnicamente posible"
    },
    correcta: "B"
  },
  {
    pregunta: "¿Cuál de las siguientes acciones sería considerada una práctica ética dentro del rol de un profesional de ciberseguridad?",
    opciones: {
      A: "Divulgar fallos críticos en redes sociales sin informar primero a la organización afectada",
      B: "Modificar configuraciones de seguridad sin consentimiento del equipo responsable",
      C: "Evitar daños, proteger datos sensibles y seguir el marco legal correspondiente",
      D: "Realizar pruebas intrusivas en producción para evaluar vulnerabilidades sin autorización"
    },
    correcta: "C"
  },
  {
    pregunta: "¿Qué principio clave establece la privacidad por diseño dentro de un sistema o aplicación?",
    opciones: {
      A: "Que la privacidad debe integrarse desde las etapas iniciales de diseño y arquitectura",
      B: "Que la protección de datos se agrega después del desarrollo, como una capa adicional",
      C: "Que los usuarios deben encargarse de cifrar manualmente su información",
      D: "Que las organizaciones deben recolectar todos los datos posibles para prevenir fraudes"
    },
    correcta: "A"
  },
  {
    pregunta: "¿Cuál es una de las obligaciones principales establecidas por GDPR?",
    opciones: {
      A: "Autorizar el uso de datos personales para cualquier propósito empresarial",
      B: "Permitir almacenamiento ilimitado de información sin restricciones",
      C: "Recolectar datos personales sin informar a los usuarios para reducir trámites administrativos",
      D: "Garantizar derechos como acceso, rectificación, eliminación y portabilidad de los datos"
    },
    correcta: "D"
  },
  {
    pregunta: "¿Qué fase del ciclo de mejora continua de ISO 27001 se enfoca en verificar que los controles de seguridad funcionen correctamente?",
    opciones: {
      A: "Otorga al ciudadano el derecho a conocer, actualizar o suprimir sus datos personales",
      B: "Permite el uso de datos personales únicamente por entidades gubernamentales",
      C: "Limita al ciudadano para que no pueda modificar información en manos de terceros",
      D: "Obliga a todas las organizaciones a compartir datos personales con cualquier solicitante"
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
  const num_modulo = 9; 
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
        <button class="botones_footer" onclick="location.href='pagina_44.html'">Siguiente</button>
      </div>
    `;
  } else {
    footerHtml = `
      <button class="botones_footer" onclick="location.href='pagina_43.html'">Reintentar</button>
    `;
  }

  footerCont.innerHTML = footerHtml;

  retro.textContent = "";  
  sig_btn.style.display = "none";
}

cargar_pregunta();