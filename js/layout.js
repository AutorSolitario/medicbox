/* ============================================================
   MEDIC BOX — Inyección de header y footer (parciales)
   Carga partials/header.html y partials/footer.html con fetch,
   marca el enlace activo del menú y dispara el evento layoutReady.
   Requiere servidor local (Live Server / python -m http.server) por CORS.
   ============================================================ */

(async function cargarLayout(){
  const contenedorHeader = document.getElementById("header");
  const contenedorFooter = document.getElementById("footer");

  // Resuelve la ruta relativa (funciona en subpáginas y en GitHub Pages)
  async function inyectar(destino, archivo){
    if(!destino) return;
    try{
      const resp = await fetch(archivo, { cache: "no-cache" });
      if(!resp.ok) throw new Error(resp.status);
      destino.innerHTML = await resp.text();
    }catch(err){
      console.error("No se pudo cargar", archivo, err);
      destino.innerHTML = "<div style='padding:1rem;text-align:center;color:#c62828'>No se pudo cargar el diseño. Ejecuta el sitio con un servidor local (Live Server).</div>";
    }
  }

  await Promise.all([
    inyectar(contenedorHeader, "partials/header.html"),
    inyectar(contenedorFooter, "partials/footer.html")
  ]);

  marcarEnlaceActivo();
  activarMenuMovil();

  // Aviso al resto de scripts de que el layout ya está en el DOM
  document.dispatchEvent(new CustomEvent("layoutReady"));
})();

/* Marca el enlace del menú correspondiente a la página actual */
function marcarEnlaceActivo(){
  let actual = location.pathname.split("/").pop();
  if(!actual || actual === "") actual = "index.html";
  document.querySelectorAll("#header .nav a[data-page]").forEach(a => {
    if(a.getAttribute("data-page") === actual) a.classList.add("activo");
  });
}

/* Menú hamburguesa para móvil */
function activarMenuMovil(){
  const toggle = document.querySelector("#header .menu-toggle");
  const nav = document.querySelector("#header .nav");
  if(!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    nav.classList.toggle("abierto");
    const abierto = nav.classList.contains("abierto");
    toggle.setAttribute("aria-expanded", abierto);
    toggle.innerHTML = abierto ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("abierto")));
}
