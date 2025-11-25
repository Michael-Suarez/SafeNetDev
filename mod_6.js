const preguntas = [
  {
    pregunta: "¿Cuál es el objetivo principal de aplicar segmentación en una infraestructura de red?",
    opciones: {
      A: "Permitir que una única subred administre todos los dispositivos sin restricciones",
      B: "Garantizar que todos los usuarios tengan acceso uniforme a todos los recursos",
      C: "Reducir la superficie de ataque al aislar zonas y limitar el movimiento lateral",
      D: "Incrementar el rendimiento del hardware mediante virtualización"
    },
    correcta: "C"
  },
  {
    pregunta: "¿Cuál de los siguientes protocolos está diseñado específicamente para proteger la administración remota de sistemas críticos?",
    opciones: {
      A: "SSH",
      B: "HTTPS",
      C: "DNSSEC",
      D: "FTP"
    },
    correcta: "A"
  },
  {
    pregunta: "¿Qué problema busca mitigar DNSSEC dentro de una infraestructura de red?",
    opciones: {
      A: "Ataques de fuerza bruta contra credenciales administrativas",
      B: "Suplantación o manipulación de respuestas DNS durante la resolución de nombres",
      C: "Cifrado débil durante el tráfico web entre cliente y servidor",
      D: "Accesos remotos no autorizados a servicios expuestos en internet"
    },
    correcta: "B"
  },
  {
    pregunta: "En entornos de nube como AWS, Azure o GCP, ¿qué práctica está directamente relacionada con evitar accesos indebidos y fugas de información?",
    opciones: {
      A: "Configurar redes públicas para facilitar la comunicación entre servicios",
      B: "Asignar permisos amplios por defecto para agilizar despliegues",
      C: "Implementar IAM con privilegios mínimos y auditorías frecuentes",
      D: "Desactivar el monitoreo continuo para reducir costos operativos"
    },
    correcta: "C"
  },
  {
    pregunta: "¿Cuál de los siguientes controles forma parte del enfoque de protección en la nube dentro de los proveedores modernos?",
    opciones: {
      A: "Reemplazar claves de cifrado por contraseñas simples para facilitar el acceso",
      B: "Permitir configuraciones abiertas para maximizar la disponibilidad pública",
      C: "Usar únicamente redes planas para mantener compatibilidad entre servicios",
      D: "Aplicar segmentación lógica entre recursos, cifrado y firewalls administrados"
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
  const num_modulo = 6; 
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
        <button class="botones_footer" onclick="location.href='pagina_32.html'">Siguiente</button>
      </div>
    `;
  } else {
    footerHtml = `
      <button class="botones_footer" onclick="location.href='pagina_31.html'">Reintentar</button>
    `;
  }

  footerCont.innerHTML = footerHtml;

  retro.textContent = "";  
  sig_btn.style.display = "none";
}

cargar_pregunta();