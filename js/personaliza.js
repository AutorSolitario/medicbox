/* ============================================================
   MEDIC BOX — Configurador de personalización (Anexo C)
   Precio en vivo. Pasos: modelo → color → nombre/ID → accesorios → resumen.
   ============================================================ */

const MODELOS_PERSONALIZABLES = [
  { id:"original", nombre:"MEDIC BOX Original", precio:25.00 },
  { id:"kids",     nombre:"MEDIC BOX Kids",     precio:29.90 },
  { id:"travel",   nombre:"MEDIC BOX Travel",   precio:39.90 },
  { id:"smart",    nombre:"MEDIC BOX Smart",    precio:44.90 }
];

const COLORES = [
  { valor:"Azul",     hex:"#1565C0" },
  { valor:"Amarillo", hex:"#FFC107" },
  { valor:"Blanco",   hex:"#FFFFFF" },
  { valor:"Gris",     hex:"#546E7A" },
  { valor:"Celeste",  hex:"#4FC3F7" },
  { valor:"Negro",    hex:"#212121" }
];

// Identificación: se elige una opción (excluyentes)
const IDENTIFICACION = [
  { id:"id-ninguno", texto:"Sin nombre",                       precio:0 },
  { id:"id-nombre",  texto:"Nombre impreso",                   precio:2.50 },
  { id:"id-nomtel",  texto:"Nombre + teléfono de emergencia",  precio:3.50 }
];

// Accesorios: múltiples
const ACCESORIOS_PERS = [
  { id:"tarjeta",   texto:"Tarjeta médica personalizada",  precio:3.00 },
  { id:"infantil",  texto:"Diseño infantil predeterminado",precio:4.90 },
  { id:"especial",  texto:"Diseño especial (desde)",       precio:7.90 },
  { id:"separadores",texto:"Separadores adicionales",      precio:3.50 },
  { id:"logo",      texto:"Logotipo institucional (desde)",precio:5.00 },
  { id:"regalo",    texto:"Empaque para regalo",           precio:3.50 }
];

const estadoPers = { modelo:MODELOS_PERSONALIZABLES[0], color:"Azul", nombreTexto:"", identificacion:IDENTIFICACION[0], accesorios:[] };

function iniciarPersonalizador(){
  const cont = document.getElementById("configurador");
  if(!cont) return;

  // Paso 1: modelo
  document.getElementById("paso-modelo").innerHTML = MODELOS_PERSONALIZABLES.map((m,i)=>`
    <div class="opcion ${i===0?'activa':''}" data-modelo="${m.id}" role="button" tabindex="0">
      <b>${m.nombre}</b><small>${precioUSD(m.precio)}</small>
    </div>`).join("");

  // Paso 2: color
  document.getElementById("paso-color").innerHTML = COLORES.map((c,i)=>`
    <div class="opcion ${i===0?'activa':''}" data-color="${c.valor}" role="button" tabindex="0" style="display:flex;align-items:center;gap:.6rem">
      <span class="chip-color" style="background:${c.hex}"></span><b>${c.valor}</b>
    </div>`).join("");

  // Paso 3: identificación
  document.getElementById("paso-id").innerHTML = `
    <div class="campo">
      <label for="pers-nombre">Nombre o identificación a imprimir</label>
      <input type="text" id="pers-nombre" maxlength="24" placeholder="Ej.: María Pérez">
    </div>
    <div class="opciones">
      ${IDENTIFICACION.map((o,i)=>`<div class="opcion ${i===0?'activa':''}" data-id="${o.id}" role="button" tabindex="0"><b>${o.texto}</b><small>${o.precio?('+'+precioUSD(o.precio)):'Gratis'}</small></div>`).join("")}
    </div>`;

  // Paso 4: accesorios
  document.getElementById("paso-accesorios").innerHTML = ACCESORIOS_PERS.map(a=>`
    <div class="opcion" data-acc="${a.id}" role="button" tabindex="0">
      <b>${a.texto}</b><small>+${precioUSD(a.precio)}</small>
    </div>`).join("");

  // Listeners
  cont.querySelectorAll("[data-modelo]").forEach(el=>el.addEventListener("click",()=>{
    seleccionUnica(el,"[data-modelo]"); estadoPers.modelo = MODELOS_PERSONALIZABLES.find(m=>m.id===el.dataset.modelo); refrescar();
  }));
  cont.querySelectorAll("[data-color]").forEach(el=>el.addEventListener("click",()=>{
    seleccionUnica(el,"[data-color]"); estadoPers.color = el.dataset.color; refrescar();
  }));
  cont.querySelectorAll("[data-id]").forEach(el=>el.addEventListener("click",()=>{
    seleccionUnica(el,"[data-id]"); estadoPers.identificacion = IDENTIFICACION.find(o=>o.id===el.dataset.id); refrescar();
  }));
  cont.querySelectorAll("[data-acc]").forEach(el=>el.addEventListener("click",()=>{
    el.classList.toggle("activa");
    estadoPers.accesorios = [...cont.querySelectorAll("[data-acc].activa")].map(x=>ACCESORIOS_PERS.find(a=>a.id===x.dataset.acc));
    refrescar();
  }));
  const inpNombre = document.getElementById("pers-nombre");
  if(inpNombre) inpNombre.addEventListener("input", e => { estadoPers.nombreTexto = e.target.value; refrescar(); });

  // Accesibilidad: Enter/Espacio activan las opciones
  cont.querySelectorAll(".opcion").forEach(el=>el.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){e.preventDefault();el.click();} }));

  document.getElementById("btn-agregar-pers").addEventListener("click", agregarPersonalizacion);
  refrescar();
}

function seleccionUnica(el, selector){
  el.closest(".opciones, #paso-modelo, #paso-color").querySelectorAll(selector).forEach(x=>x.classList.remove("activa"));
  el.classList.add("activa");
}

function calcularTotalPers(){
  let extra = estadoPers.identificacion.precio + estadoPers.accesorios.reduce((s,a)=>s+a.precio,0);
  return { extra:+extra.toFixed(2), total:+(estadoPers.modelo.precio + extra).toFixed(2) };
}

function refrescar(){
  const { extra, total } = calcularTotalPers();
  const lista = document.getElementById("resumen-lista");
  const filas = [];
  filas.push(`<li><span>${estadoPers.modelo.nombre}</span><span>${precioUSD(estadoPers.modelo.precio)}</span></li>`);
  filas.push(`<li><span>Color: ${estadoPers.color}</span><span>Gratis</span></li>`);
  if(estadoPers.nombreTexto) filas.push(`<li><span>Texto: "${estadoPers.nombreTexto}"</span><span></span></li>`);
  if(estadoPers.identificacion.precio) filas.push(`<li><span>${estadoPers.identificacion.texto}</span><span>+${precioUSD(estadoPers.identificacion.precio)}</span></li>`);
  estadoPers.accesorios.forEach(a=>filas.push(`<li><span>${a.texto}</span><span>+${precioUSD(a.precio)}</span></li>`));
  lista.innerHTML = filas.join("");
  document.getElementById("resumen-total").textContent = precioUSD(total);
}

function agregarPersonalizacion(){
  const { extra } = calcularTotalPers();
  const detalles = [
    `Color: ${estadoPers.color}`,
    estadoPers.nombreTexto ? `Texto: "${estadoPers.nombreTexto}"` : null,
    estadoPers.identificacion.precio ? estadoPers.identificacion.texto : null,
    ...estadoPers.accesorios.map(a=>a.texto)
  ].filter(Boolean);

  agregarAlCarrito(estadoPers.modelo.id, 1, {
    texto: detalles.join(" · "),
    precioExtra: extra,
    detalles
  });
}

document.addEventListener("DOMContentLoaded", iniciarPersonalizador);
