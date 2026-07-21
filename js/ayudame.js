/* ============================================================
   MEDIC BOX — "Ayúdame a elegir" (Anexo D)
   Cuestionario gratuito que recomienda modelo + accesorio complementario.
   ============================================================ */

const PREGUNTAS = [
  { id:"para", texto:"¿Para quién es el estuche?", opciones:[
    {v:"nino", t:"Para un niño o niña"},
    {v:"adulto", t:"Para un adulto"},
    {v:"mayor", t:"Para un adulto mayor"} ] },
  { id:"presentacion", texto:"¿Qué presentación de medicamento transportas?", opciones:[
    {v:"lapicera", t:"Lapiceras de insulina"},
    {v:"vial", t:"Viales o ampollas"},
    {v:"mixto", t:"Varias presentaciones"} ] },
  { id:"tiempo", texto:"¿Cuánto tiempo permaneces fuera de casa?", opciones:[
    {v:"corto", t:"Menos de 4 horas"},
    {v:"medio", t:"Entre 4 y 8 horas"},
    {v:"largo", t:"Más de 8 horas"} ] },
  { id:"gluco", texto:"¿Necesitas llevar glucómetro?", opciones:[
    {v:"si", t:"Sí"}, {v:"no", t:"No"} ] },
  { id:"viaje", texto:"¿Viajas frecuentemente?", opciones:[
    {v:"si", t:"Sí, con frecuencia"}, {v:"no", t:"Rara vez o nunca"} ] },
  { id:"temp", texto:"¿Necesitas visualizar la temperatura?", opciones:[
    {v:"si", t:"Sí, quiero monitorearla"}, {v:"no", t:"No es indispensable"} ] },
  { id:"personalizar", texto:"¿Deseas personalizarlo?", opciones:[
    {v:"si", t:"Sí, con nombre o diseño"}, {v:"no", t:"No, así está bien"} ] },
  { id:"ciudad", texto:"¿En qué ciudad necesitas la entrega?", opciones:[
    {v:"quito", t:"Quito"}, {v:"valles", t:"Valles de Quito"}, {v:"otra", t:"Otra ciudad del Ecuador"} ] }
];

const respuestasQuiz = {};

function iniciarQuiz(){
  const cont = document.getElementById("quiz");
  if(!cont) return;
  cont.innerHTML = PREGUNTAS.map((p,i)=>`
    <div class="quiz-pregunta reveal">
      <h3>${i+1}. ${p.texto}</h3>
      <div class="quiz-opciones">
        ${p.opciones.map(o=>`<label><input type="radio" name="${p.id}" value="${o.v}"> ${o.t}</label>`).join("")}
      </div>
    </div>`).join("") + `
    <div class="centro">
      <button class="btn btn--primario" id="btn-recomendar"><i class="fa-solid fa-wand-magic-sparkles"></i> Ver mi recomendación</button>
    </div>
    <div id="resultado-quiz" class="oculto" style="margin-top:2rem"></div>`;

  cont.querySelectorAll("input[type=radio]").forEach(r => r.addEventListener("change", e => respuestasQuiz[e.target.name] = e.target.value));
  document.getElementById("btn-recomendar").addEventListener("click", calcularRecomendacion);

  // Reveal GARANTIZADO: las preguntas se insertan por JS después de que el
  // observador de animaciones ya se ejecutó, así que las mostramos aquí con
  // una breve cascada para que el cuestionario nunca quede invisible.
  requestAnimationFrame(() => {
    cont.querySelectorAll(".reveal:not(.visible)").forEach((el, i) =>
      setTimeout(() => el.classList.add("visible"), 60 + i * 55));
  });
}

function calcularRecomendacion(){
  // Modelo recomendado según reglas de prioridad
  let modelo = "original", accesorio = "gel-4", motivo = [];

  if(respuestasQuiz.para === "nino"){ modelo = "kids"; motivo.push("es para un niño"); }
  if(respuestasQuiz.viaje === "si" || respuestasQuiz.tiempo === "largo"){ modelo = "travel"; motivo.push("pasas mucho tiempo fuera o viajas con frecuencia"); }
  if(respuestasQuiz.temp === "si"){ modelo = "smart"; motivo.push("quieres monitorear la temperatura"); }
  // Si es niño pero también quiere temperatura/viaje, priorizamos necesidad térmica salvo que sea claramente infantil
  if(respuestasQuiz.para === "nino" && respuestasQuiz.viaje !== "si" && respuestasQuiz.temp !== "si"){ modelo = "kids"; }

  // Accesorio complementario
  if(respuestasQuiz.gluco === "si") accesorio = "estuche-gluco";
  else if(respuestasQuiz.viaje === "si") accesorio = "caps-travel";
  else if(respuestasQuiz.temp === "si") accesorio = "termo-basico";
  else if(respuestasQuiz.personalizar === "si") accesorio = "tarjeta-med";
  else if(respuestasQuiz.tiempo === "largo") accesorio = "gel-6";

  const prodM = obtenerProducto(modelo);
  const prodA = obtenerProducto(accesorio);
  const cont = document.getElementById("resultado-quiz");
  cont.classList.remove("oculto");
  cont.innerHTML = `
    <div class="recomendacion">
      <i class="fa-solid fa-circle-check" style="font-size:2.4rem;color:#2E7D32"></i>
      <h2>Te recomendamos la ${prodM.nombre}</h2>
      <p style="color:var(--gris);max-width:52ch;margin:.6rem auto">${prodM.resumen} ${motivo.length?("Elegimos este modelo porque "+motivo.join(" y ")+"."):""}</p>
      <p><b>Precio:</b> ${precioUSD(prodM.precio)} &nbsp;·&nbsp; <b>Accesorio complementario:</b> ${prodA.nombre} (${precioUSD(prodA.precio)})</p>
      <div style="display:flex;gap:.7rem;justify-content:center;flex-wrap:wrap;margin-top:1.2rem">
        <button class="btn btn--primario" id="btn-agregar-reco"><i class="fa-solid fa-cart-plus"></i> Agregar recomendación al carrito</button>
        <a class="btn btn--linea" href="producto.html?id=${modelo}">Ver detalles del modelo</a>
      </div>
      <p style="font-size:.82rem;color:var(--gris);margin-top:1rem">Recomendación orientativa y gratuita. Consulta a tu médico o farmacéutico sobre la conservación de tu tratamiento.</p>
    </div>`;

  document.getElementById("btn-agregar-reco").addEventListener("click", ()=>{
    if(prodM.estado === "disponible") agregarAlCarrito(modelo,1);
    if(prodA.estado === "disponible") agregarAlCarrito(accesorio,1);
    if(prodM.estado !== "disponible") mostrarToast("El modelo recomendado estará disponible pronto; agregamos el accesorio.");
  });
  cont.scrollIntoView({ behavior:"smooth", block:"center" });
}

document.addEventListener("DOMContentLoaded", iniciarQuiz);