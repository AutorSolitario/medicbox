"use strict";

/* ============================================================
   RINCÓN DE SAPITA · Diario
   Todo el contenido editable está en el arreglo "razones".
   ============================================================ */

/* ---------- Guardián de acceso (solo un detalle romántico) ---------- */
if (sessionStorage.getItem("sapita_ok") !== "1") {
  location.replace("acceso-sapita.html");
}

/* ---------- Contenido de las tarjetas "Razones para quedarme" ----------
   Para agregar o cambiar una razón, edita este arreglo.
   Cada bloque puede ser  {t:"p", txt:"..."}  (párrafo)
                     o     {t:"cita", txt:"..."}  (frase citada).           */
const razones = [
  {
    tema: "tema-osos",
    titulo: "Quedarme a su lado",
    frase: "El día en que supe que no quería alejarme nunca.",
    imagen: "assets/images/razon-osos.jpg",
    alt: "Nuestra parejita de ositos",
    bloques: [
      { t: "p", txt: "Hubo un momento en el que comprendí que no quería alejarme nunca más de usted." },
      { t: "p", txt: "Fue el día en que me dijo que no quería irse de mi vida y que temía por mí." },
      { t: "p", txt: "Cuando sacrificó uno de sus deseos por mi salud." },
      { t: "p", txt: "Cuando me hizo sentir que yo era todo para usted." },
      { t: "p", txt: "Desde ese día supe que quería quedarme a su lado, acompañarla y no irme nunca más." },
      { t: "p", txt: "Porque entendí que detrás de su forma silenciosa de amar existe un corazón que me ha cuidado incluso en sus momentos más difíciles." }
    ],
    final: "Desde ese día, quedarme dejó de ser una decisión y se convirtió en mi deseo."
  },
  {
    tema: "tema-gatito",
    titulo: "Cuidar su corazón",
    frase: "Sí, quiero cuidarlo todos los días.",
    imagen: "assets/images/razon-gatito.jpg",
    alt: "Un gatito tierno con moños y corazones",
    bloques: [
      { t: "p", txt: "Hay algo que nunca olvidé." },
      { t: "p", txt: "En una de sus cartas usted me preguntó:" },
      { t: "cita", txt: "“¿Podría cuidar mi corazón?”" },
      { t: "p", txt: "Mi respuesta sigue siendo la misma: sí." },
      { t: "p", txt: "Me lo propuse hace mucho tiempo y quiero hacerlo todos los días. No porque sea perfecto, sino porque quiero aprender a escucharla más, entenderla mejor, respetarla y cuidar aquello que para mí es lo más valioso: su corazón." },
      { t: "p", txt: "También quiero que cuidemos el mío." },
      { t: "p", txt: "Creo que los dos hemos sufrido suficiente y que ya es momento de dejar descansar nuestras heridas." },
      { t: "p", txt: "Me gustaría que poco a poco sanemos nuestro pasado, que dejemos atrás aquello que nos hizo daño y que construyamos un amor donde el pasado ya no tenga más fuerza que nuestro presente." }
    ],
    final: "Quiero cuidar su corazón sin olvidar que el mío también encontró un hogar en usted."
  },
  {
    tema: "tema-noche",
    titulo: "Yo soy suyo y usted es mía",
    frase: "Elegirla incluso en las decisiones pequeñas.",
    imagen: "assets/images/razon-noche.jpg",
    alt: "Una escena nocturna serena, con estrellas y agua",
    bloques: [
      { t: "p", txt: "Quiero que seamos exclusivos el uno para el otro." },
      { t: "p", txt: "Que cuando tengamos que tomar una decisión importante no pensemos solamente en lo que queremos nosotros, sino también en cómo podría sentirse la otra persona." },
      { t: "p", txt: "Me gustaría que siempre nos preguntemos:" },
      { t: "cita", txt: "¿Cómo se sentiría mi pareja con esto?" },
      { t: "p", txt: "Creo que así se cuida una relación, pensando siempre en los dos y no solamente en uno mismo." },
      { t: "p", txt: "Solo le pido una cosa a Dios: que nos permita quedarnos juntos. Que bendiga esta nueva etapa. Que nos ayude a cuidar este amor. Que nunca olvidemos todo lo que tuvimos que pasar para llegar hasta aquí." },
      { t: "p", txt: "Hoy siento que, por fin, tenemos la oportunidad de empezar bien nuestra historia y no quiero desaprovecharla." }
    ],
    final: "Quiero elegirla incluso en las decisiones pequeñas, porque ahora mi vida también se construye pensando en usted."
  }
];

/* ---------- Partículas flotantes (corazones, estrellas, pétalos) ---------- */
function crearParticulas(cantidad) {
  const cielo = document.getElementById("particulas");
  if (!cielo) return;
  const simbolos = ["💙", "🤍", "🩵", "✨", "⭐", "🌸", "🌷"];
  for (let i = 0; i < cantidad; i++) {
    const p = document.createElement("span");
    p.className = "particula";
    p.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    p.style.left = (Math.random() * 100) + "vw";
    p.style.fontSize = (12 + Math.random() * 16) + "px";
    p.style.animationDuration = (13 + Math.random() * 12) + "s";
    p.style.animationDelay = (Math.random() * 12) + "s";
    cielo.appendChild(p);
  }
}

/* ---------- Componente: tarjeta de razón ---------- */
function crearTarjeta(razon, indice) {
  const art = document.createElement("article");
  art.className = "tarjeta-razon " + razon.tema;
  art.tabIndex = 0;
  art.setAttribute("role", "button");
  art.setAttribute("aria-label", razon.titulo);
  art.innerHTML = `
    <div class="tarjeta-razon__img">
      <img src="${razon.imagen}" alt="${razon.alt}"
           onerror="this.style.display='none'; this.parentNode.textContent='(ilustración)';">
    </div>
    <div class="tarjeta-razon__cuerpo">
      <h3 class="tarjeta-razon__titulo">${razon.titulo}</h3>
      <p class="tarjeta-razon__frase">${razon.frase}</p>
    </div>`;
  const abrir = () => abrirModal(indice);
  art.addEventListener("click", abrir);
  art.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrir(); }
  });
  return art;
}

function construirTarjetas() {
  const grid = document.getElementById("razones-grid");
  if (!grid) return;
  razones.forEach((r, i) => grid.appendChild(crearTarjeta(r, i)));

  // Rebote escalonado cuando la cuadrícula entra en pantalla
  const tarjetas = grid.querySelectorAll(".tarjeta-razon");
  const lanzar = () => tarjetas.forEach((t, i) => {
    setTimeout(() => t.classList.add("salta"), i * 140);
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => { if (e.isIntersecting) { lanzar(); io.disconnect(); } });
    }, { threshold: 0.25 });
    io.observe(grid);
  } else {
    lanzar();
  }
}

/* ---------- Modales ---------- */
const modal       = document.getElementById("modal");
const modalTitulo = document.getElementById("modal-titulo");
const modalCuerpo = document.getElementById("modal-cuerpo");

function abrirModal(indice) {
  const r = razones[indice];
  modalTitulo.textContent = r.titulo;

  let html = "";
  r.bloques.forEach(b => {
    if (b.t === "cita") html += `<blockquote>${b.txt}</blockquote>`;
    else html += `<p>${b.txt}</p>`;
  });
  if (r.final) html += `<div class="modal-frase">${r.final}</div>`;
  modalCuerpo.innerHTML = html;

  modal.classList.add("abierto");
  document.body.style.overflow = "hidden";
  document.getElementById("modal-cerrar").focus();
}

function cerrarModal() {
  modal.classList.remove("abierto");
  document.body.style.overflow = "";
}

/* ---------- Arranque ---------- */
document.addEventListener("DOMContentLoaded", () => {
  crearParticulas(22);
  construirTarjetas();

  document.getElementById("modal-cerrar").addEventListener("click", cerrarModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) cerrarModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrarModal(); });

  document.getElementById("btn-cerrar").addEventListener("click", () => {
    sessionStorage.removeItem("sapita_ok");
    location.replace("nosotros.html");
  });

  // Aparición suave al hacer scroll (tarjetas, polaroid, foto del beso, etc.)
  const revelables = document.querySelectorAll(".reveal-scroll");
  if ("IntersectionObserver" in window && revelables.length) {
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach(ent => {
        if (ent.isIntersecting) { ent.target.classList.add("visible"); io.unobserve(ent.target); }
      });
    }, { threshold: 0.15 });
    revelables.forEach(el => io.observe(el));
  } else {
    revelables.forEach(el => el.classList.add("visible"));
  }
// ----- Visor para ampliar el collage -----
  (function () {
    const collage = document.getElementById("collage");
    if (!collage) return;

    const fotos = [...collage.querySelectorAll(".collage__foto img")].map(img => img.src);
    let i = 0;

    const zoom = document.createElement("div");
    zoom.className = "zoom";
    zoom.innerHTML = `
      <button class="zoom__cerrar" type="button" aria-label="Cerrar">×</button>
      <button class="zoom__nav zoom__nav--prev" type="button" aria-label="Anterior">‹</button>
      <img alt="Recuerdo ampliado">
      <button class="zoom__nav zoom__nav--next" type="button" aria-label="Siguiente">›</button>`;
    document.body.appendChild(zoom);
    const zImg = zoom.querySelector("img");

    const mostrar = (n) => { i = (n + fotos.length) % fotos.length; zImg.src = fotos[i]; };
    const abrir = (n) => { mostrar(n); zoom.classList.add("abierto"); document.body.style.overflow = "hidden"; };
    const cerrar = () => { zoom.classList.remove("abierto"); document.body.style.overflow = ""; };

    collage.querySelectorAll(".collage__foto").forEach((fig, idx) => {
      fig.addEventListener("click", () => abrir(idx));
    });
    zoom.querySelector(".zoom__cerrar").addEventListener("click", cerrar);
    zoom.querySelector(".zoom__nav--prev").addEventListener("click", () => mostrar(i - 1));
    zoom.querySelector(".zoom__nav--next").addEventListener("click", () => mostrar(i + 1));
    zoom.addEventListener("click", (e) => { if (e.target === zoom) cerrar(); });
    document.addEventListener("keydown", (e) => {
      if (!zoom.classList.contains("abierto")) return;
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") mostrar(i + 1);
      if (e.key === "ArrowLeft") mostrar(i - 1);
    });
  })();
});