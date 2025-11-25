function guard_progre_mod(num_modulo, porcentaje) 
{
  const clave = `modulo_${num_modulo}_progreso`;
  const valor_a = parseInt(localStorage.getItem(clave) || '0', 10);
  const valor_n = Math.max(valor_a, porcentaje);

  localStorage.setItem(clave, valor_n.toString());
}

function leer_progre_mod(num_modulo) 
{
  const clave = `modulo_${num_modulo}_progreso`;
  return parseInt(localStorage.getItem(clave) || '0', 10);
}

function guard_ult_pag(num_modulo) 
{
  const clave = `modulo_${num_modulo}_ultima_pagina`;
  const pagina = window.location.pathname.split('/').pop();
  localStorage.setItem(clave, pagina);
}

function leer_ult_pag(num_modulo) 
{
  const clave = `modulo_${num_modulo}_ultima_pagina`;
  return localStorage.getItem(clave); 
}
