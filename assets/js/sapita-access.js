/* ============================================================
   "Mi Sapita" — Acceso oculto (SOLO se incluye en nosotros.html)
   Inyecta un pequeño sapito cerca del copyright del footer.
   No aparece en el menú, ni en otras páginas, ni en buscadores.
   Se ejecuta tras el evento layoutReady (footer ya inyectado).
   ============================================================ */

document.addEventListener("layoutReady", () => {
  const base = document.querySelector(".footer__base");
  if(!base || document.getElementById("sapito-secreto")) return;

  const enlace = document.createElement("a");
  enlace.id = "sapito-secreto";
  enlace.href = "acceso-sapita.html";
  enlace.setAttribute("aria-label", "Un pequeño secreto");
  enlace.title = "Un pequeño secreto 💙";
  enlace.innerHTML = `<img src="assets/images/sapito-secreto.png" alt="" width="30" height="30">`;

  // Estilo discreto e independiente (no parece un botón)
  Object.assign(enlace.style, {
    display:"inline-flex", alignItems:"center", justifyContent:"center",
    marginLeft:"18px", opacity:"0.6", cursor:"pointer",
    transition:"transform .25s ease, opacity .25s ease", position:"relative", lineHeight:"0"
  });

  // Al pasar el cursor: pequeño salto + corazón discreto
  enlace.addEventListener("mouseenter", () => {
    enlace.style.transform = "translateY(-4px)";
    enlace.style.opacity = "1";
    if(!enlace.querySelector(".sapito-corazon")){
      const c = document.createElement("span");
      c.className = "sapito-corazon";
      c.textContent = "💙";
      Object.assign(c.style, { position:"absolute", top:"-14px", left:"50%", transform:"translateX(-50%)", fontSize:"12px", animation:"none" });
      enlace.appendChild(c);
    }
  });
  enlace.addEventListener("mouseleave", () => {
    enlace.style.transform = "";
    enlace.style.opacity = "0.6";
    const c = enlace.querySelector(".sapito-corazon");
    if(c) c.remove();
  });

  // Separado ligeramente del copyright, sin texto que lo delate
  base.appendChild(enlace);
});
