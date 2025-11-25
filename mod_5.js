const preguntas = [
  {
    pregunta: "¿Cuál de las siguientes situaciones representa una vulnerabilidad común en redes que los atacantes pueden aprovechar?",
    opciones: {
      A: "Firmware sin actualizar, autenticación débil o puertos configurados incorrectamente",
      B: "Segmentación de red mediante VLAN para separar departamentos",
      C: "Implementación de firewalls y monitoreo constante del tráfico",
      D: "Uso exclusivo de protocolos cifrados como HTTPS en toda la red"
    },
    correcta: "A"
  },
  {
    pregunta: "¿Cuál es una diferencia clave entre una LAN y una VLAN dentro de una infraestructura corporativa?",
    opciones: {
      A: "La VLAN permite segmentar lógicamente la red sin modificar la infraestructura física",
      B: "La LAN es virtual y la VLAN es física",
      C: "La LAN cifra automáticamente el tráfico mientras que la VLAN no lo hace",
      D: "La VLAN opera exclusivamente a través de internet, mientras que la LAN solo opera localmente"
    },
    correcta: "A"
  },
  {
    pregunta: "¿Qué característica define a una VPN en términos de seguridad de red?",
    opciones: {
      A: "Su capacidad de dividir la red en segmentos lógicos para reducir el dominio de difusión",
      B: "Su uso exclusivo en redes internas que no requieren conexión a internet",
      C: "Su habilidad para asignar automáticamente direcciones IP privadas a dispositivos locales",
      D: "Su función de cifrar la comunicación entre el usuario e Internet para permitir acceso remoto seguro"
    },
    correcta: "D"
  },
  {
    pregunta: "¿Qué función principal cumple un IDS dentro de una red?",
    opciones: {
      A: "Bloquear automáticamente el tráfico malicioso en tiempo real",
      B: "Monitorear y alertar sobre actividades sospechosas sin intervenir en el tráfico",
      C: "Cifrar el tráfico para evitar interceptaciones externas",
      D: "Reemplazar la necesidad de un firewall perimetral"
    },
    correcta: "B"
  },
  {
    pregunta: "¿En qué se diferencia principalmente un IPS de un IDS?",
    opciones: {
      A: "El IPS solo registra actividad, mientras que el IDS bloquea ataques automáticamente",
      B: "El IDS actúa en tiempo real y el IPS lo hace de forma pasiva",
      C: "El IPS detecta y además bloquea el tráfico malicioso, mientras que el IDS solo alerta",
      D: "El IDS se usa para redes remotas y el IPS para redes internas únicamente"
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
  const num_modulo = 5;
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
        <button class="botones_footer" onclick="location.href='pagina_27.html'">Siguiente</button>
      </div>
    `;
  } else {
    footerHtml = `
      <button class="botones_footer" onclick="location.href='pagina_26.html'">Reintentar</button>
    `;
  }

  footerCont.innerHTML = footerHtml;

  retro.textContent = "";  
  sig_btn.style.display = "none";
}

cargar_pregunta();