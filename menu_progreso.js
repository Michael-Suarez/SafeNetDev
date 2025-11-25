const primerasPaginasModulo = {
  "1": "pagina_5.html",
  "2": "pagina_9.html",
  "3": "pagina_13.html",
  "4": "pagina_17.html",
  "5": "pagina_22.html",
  "6": "pagina_27.html",
  "7": "pagina_32.html",
  "8": "pagina_36.html",
  "9": "pagina_40.html"
};

document.addEventListener('DOMContentLoaded', () => {
  const modulos = document.querySelectorAll('.mod');

  modulos.forEach(mod => {
    const num_modulo = mod.dataset.module;      
    const barra = mod.querySelector('.progreso');
    const text_porcent = mod.querySelector('.porcentaje'); 

    const clave_progre = `modulo_${num_modulo}_progreso`;
    const progre_guard = parseInt(localStorage.getItem(clave_progre) || '0', 10);

    if (barra) {
      barra.style.width = `${progre_guard}%`;
    }

    if (text_porcent) {
      text_porcent.textContent = `${progre_guard}%`;
    }
  });

  const links = document.querySelectorAll('.mod_hs');

  links.forEach(link => {
    const num_modulo = link.dataset.module;
    if (!num_modulo) return;

    const clave_progre = `modulo_${num_modulo}_progreso`;
    const clave_ult = `modulo_${num_modulo}_ultima_pagina`;

    const progre_guard = parseInt(localStorage.getItem(clave_progre) || '0', 10);
    const ultima = localStorage.getItem(clave_ult);
    const primera = primerasPaginasModulo[num_modulo] || link.getAttribute('href');

    if (progre_guard === 100) 
    {
      link.href = primera;
    } 
    else if (ultima) 
    {
      link.href = ultima;
    } 
    else 
    {
      link.href = primera;
    }
  });
});

