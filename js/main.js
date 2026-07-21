/* ============================================================
   MEDIC BOX — Interacciones globales
   Animaciones al scroll, header sticky, año del footer y utilidades.
   ============================================================ */

/* Header que cambia al hacer scroll (se ejecuta tras inyectar el layout) */
function activarHeaderScroll(){
  const header = document.getElementById("siteHeader");
  if(!header) return;
  const onScroll = () => header.classList.toggle("header--scroll", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();
}

/* Año dinámico en el footer */
function ponerAnio(){
  document.querySelectorAll("[data-anio]").forEach(el => el.textContent = new Date().getFullYear());
}

/* Animaciones al hacer scroll con IntersectionObserver */
function activarReveal(){
  const elementos = document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window) || !elementos.length){
    elementos.forEach(e => e.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver((entradas) => {
    entradas.forEach(ent => {
      if(ent.isIntersecting){ ent.target.classList.add("visible"); io.unobserve(ent.target); }
    });
  }, { threshold: 0.12 });
  elementos.forEach(e => io.observe(e));
}

/* Estrellas a partir de una calificación (0–5) */
function estrellasHTML(valor){
  let html = "";
  for(let i=1;i<=5;i++){
    if(valor >= i) html += '<i class="fa-solid fa-star"></i>';
    else if(valor >= i - 0.5) html += '<i class="fa-solid fa-star-half-stroke"></i>';
    else html += '<span><i class="fa-solid fa-star"></i></span>';
  }
  return `<span class="estrellas" aria-label="Calificación ${valor} de 5">${html}<small>${valor.toFixed(1)}</small></span>`;
}
window.estrellasHTML = estrellasHTML;

/* Formatea un precio en USD */
function precioUSD(n){ return "$" + Number(n).toFixed(2); }
window.precioUSD = precioUSD;

/* Ejecutar tras cargar el layout (header/footer ya presentes) */
document.addEventListener("layoutReady", () => { activarHeaderScroll(); ponerAnio(); });
document.addEventListener("DOMContentLoaded", () => { activarReveal(); ponerAnio(); });

/* ============================================================
   Tarjeta de producto reutilizable (tienda, portada, relacionados)
   ============================================================ */
function tarjetaProductoHTML(p){
  const disp = p.estado === "disponible";
  const rev  = p.estado === "revision";
  const badges = (p.badges||[]).map(b => {
    const map = { frio:['badge--frio','fa-snowflake','Cadena de frío'], pers:['badge--pers','fa-pen','Personalizable'], envio:['badge--envio','fa-truck','Envío a domicilio'] };
    const m = map[b]; return m ? `<span class="badge ${m[0]}"><i class="fa-solid ${m[1]}"></i> ${m[2]}</span>` : "";
  }).join("");
  let boton;
  if(!disp && !rev)      boton = `<button class="btn btn--linea btn--bloque" disabled>Próximamente</button>`;
  else if(rev)           boton = `<a class="btn btn--acento btn--bloque" href="contacto.html?asunto=revision-${p.id}">Solicitar revisión</a>`;
  else                   boton = `<button class="btn btn--primario" onclick="agregarAlCarrito('${p.id}')"><i class="fa-solid fa-cart-plus"></i> Agregar</button>`;
  const pers = (disp && p.personalizable) ? `<a class="btn btn--linea" href="personaliza.html">Personalizar</a>` : "";
  return `<article class="producto reveal">
    ${p.oferta ? `<span class="etiqueta-oferta">${p.oferta}</span>` : ""}
    ${(!disp && !rev) ? `<span class="etiqueta-oferta" style="background:var(--gris);color:#fff">Próximamente</span>` : ""}
    <a class="producto__img" href="producto.html?id=${p.id}"><img src="${p.img}" alt="${p.nombre}"></a>
    <div class="producto__cuerpo">
      <div class="producto__badges">${badges}</div>
      <a href="producto.html?id=${p.id}"><h3>${p.nombre}</h3></a>
      ${estrellasHTML(p.estrellas)}
      <p style="font-size:.9rem;color:var(--gris)">${p.resumen}</p>
      <div class="producto__precio">${(rev || p.desde) ? "Desde " : ""}${precioUSD(p.precio)}</div>
      <div class="producto__acciones">${boton}${pers}</div>
    </div>
  </article>`;
}
window.tarjetaProductoHTML = tarjetaProductoHTML;
