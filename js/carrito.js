/* ============================================================
   MEDIC BOX — Carrito de compras con localStorage
   Persiste entre páginas. Soporta cantidad y personalización.
   Depende de js/productos-data.js (para nombre/precio/imagen).
   ============================================================ */

const CLAVE_CARRITO = "medicbox_carrito";

/* ---------- Lectura / escritura ---------- */
function obtenerCarrito(){
  try{ return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || []; }
  catch(e){ return []; }
}
function guardarCarrito(items){
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
  actualizarContadorCarrito();
}

/* ---------- Operaciones ---------- */
/**
 * Agrega un producto al carrito.
 * @param {string} id  id del producto (de PRODUCTOS)
 * @param {number} cantidad
 * @param {object|null} personalizacion  {texto, precioExtra, detalles[]}
 */
function agregarAlCarrito(id, cantidad = 1, personalizacion = null){
  const prod = window.obtenerProducto ? obtenerProducto(id) : null;
  if(!prod){ console.warn("Producto no encontrado:", id); return; }

  const items = obtenerCarrito();
  // Los productos personalizados se guardan como líneas separadas
  const claveLinea = personalizacion ? `${id}__${Date.now()}` : id;

  if(!personalizacion){
    const existente = items.find(i => i.linea === id && !i.personalizacion);
    if(existente){ existente.cantidad += cantidad; guardarCarrito(items); mostrarToast(`Se actualizó "${prod.nombre}" en el carrito`); return; }
  }

  const precioExtra = personalizacion ? (personalizacion.precioExtra || 0) : 0;
  items.push({
    linea: claveLinea,
    id: id,
    nombre: prod.nombre,
    precio: +(prod.precio + precioExtra).toFixed(2),
    precioBase: prod.precio,
    img: prod.img,
    cantidad: cantidad,
    personalizacion: personalizacion
  });
  guardarCarrito(items);
  mostrarToast(`"${prod.nombre}" agregado al carrito`);
}

function quitarDelCarrito(linea){
  let items = obtenerCarrito().filter(i => i.linea !== linea);
  guardarCarrito(items);
  if(typeof renderizarCarrito === "function") renderizarCarrito();
}

function cambiarCantidad(linea, delta){
  const items = obtenerCarrito();
  const item = items.find(i => i.linea === linea);
  if(!item) return;
  item.cantidad = Math.max(1, item.cantidad + delta);
  guardarCarrito(items);
  if(typeof renderizarCarrito === "function") renderizarCarrito();
}

function establecerCantidad(linea, valor){
  const items = obtenerCarrito();
  const item = items.find(i => i.linea === linea);
  if(!item) return;
  item.cantidad = Math.max(1, parseInt(valor) || 1);
  guardarCarrito(items);
  if(typeof renderizarCarrito === "function") renderizarCarrito();
}

function vaciarCarrito(){
  localStorage.removeItem(CLAVE_CARRITO);
  actualizarContadorCarrito();
  if(typeof renderizarCarrito === "function") renderizarCarrito();
}

/* ---------- Totales ---------- */
function totalItems(){ return obtenerCarrito().reduce((s,i)=>s + i.cantidad, 0); }
function subtotalCarrito(){ return obtenerCarrito().reduce((s,i)=>s + i.precio * i.cantidad, 0); }

/* ---------- Contador en el ícono ---------- */
function actualizarContadorCarrito(){
  const total = totalItems();
  document.querySelectorAll("[data-contador-carrito]").forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? "flex" : "none";
  });
}

/* ---------- Toast de confirmación ---------- */
let toastTimer = null;
function mostrarToast(mensaje){
  let toast = document.querySelector(".toast");
  if(!toast){
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role","status");
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i><span>${mensaje}</span>`;
  requestAnimationFrame(()=> toast.classList.add("visible"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toast.classList.remove("visible"), 2800);
}

/* Actualiza el contador cuando el header ya está inyectado */
document.addEventListener("layoutReady", actualizarContadorCarrito);
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);

/* Exponer */
window.agregarAlCarrito = agregarAlCarrito;
window.quitarDelCarrito = quitarDelCarrito;
window.cambiarCantidad = cambiarCantidad;
window.establecerCantidad = establecerCantidad;
window.vaciarCarrito = vaciarCarrito;
window.obtenerCarrito = obtenerCarrito;
window.subtotalCarrito = subtotalCarrito;
window.mostrarToast = mostrarToast;
