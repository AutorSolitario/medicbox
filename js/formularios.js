/* ============================================================
   MEDIC BOX — Envío de formularios con Web3Forms
   Contacto, servicios/reservas y checkout.
   Configura tu clave en WEB3FORMS_ACCESS_KEY. Sin clave => modo demostración.
   ============================================================ */

// [COMPLETAR: WEB3FORMS_ACCESS_KEY] — pega aquí tu Access Key de https://web3forms.com
const WEB3FORMS_ACCESS_KEY = "";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/* ¿Hay clave configurada? */
function hayClaveWeb3(){
  return WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY.trim().length > 10;
}

/**
 * Envía un formulario a Web3Forms.
 * @param {HTMLFormElement} form
 * @param {object} extra  campos adicionales a incluir
 * @returns {Promise<{ok:boolean, demo:boolean, mensaje:string}>}
 */
async function enviarFormulario(form, extra = {}){
  const datos = Object.fromEntries(new FormData(form).entries());
  Object.assign(datos, extra);

  // Modo demostración: no hay clave configurada
  if(!hayClaveWeb3()){
    console.info("[MEDIC BOX] Modo demostración — no se envió correo. Datos:", datos);
    await new Promise(r => setTimeout(r, 700)); // simula latencia
    return { ok:true, demo:true, mensaje:"Formulario recibido en modo demostración. Configura tu Access Key de Web3Forms para recibir correos reales." };
  }

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    from_name: "MEDIC BOX Web",
    subject: extra.subject || "Nuevo mensaje desde MEDIC BOX",
    ...datos
  };

  try{
    const resp = await fetch(WEB3FORMS_ENDPOINT, {
      method:"POST",
      headers:{ "Content-Type":"application/json", "Accept":"application/json" },
      body: JSON.stringify(payload)
    });
    const json = await resp.json();
    if(json.success) return { ok:true, demo:false, mensaje:"¡Mensaje enviado! Te responderemos muy pronto." };
    return { ok:false, demo:false, mensaje: json.message || "No se pudo enviar. Inténtalo de nuevo." };
  }catch(err){
    console.error(err);
    return { ok:false, demo:false, mensaje:"Error de conexión. Revisa tu internet e inténtalo de nuevo." };
  }
}

/* Muestra un mensaje de estado bajo el formulario */
function mostrarEstadoForm(contenedor, texto, tipo){
  if(!contenedor) return;
  const colores = { ok:"#2E7D32", error:"#c62828", demo:"#B7860B" };
  contenedor.style.display = "block";
  contenedor.style.color = colores[tipo] || "#263238";
  contenedor.style.background = tipo==="error" ? "#FDECEA" : (tipo==="demo" ? "#FFF8E1" : "#E8F5E9");
  contenedor.style.padding = ".9rem 1rem";
  contenedor.style.borderRadius = "10px";
  contenedor.style.marginTop = "1rem";
  contenedor.textContent = texto;
}

/* Conecta automáticamente los formularios con atributo data-web3form */
function conectarFormularios(){
  document.querySelectorAll("form[data-web3form]").forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector("[type=submit]");
      const estado = form.querySelector("[data-estado]");
      const textoOriginal = btn ? btn.innerHTML : "";
      if(btn){ btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...'; }

      const asunto = form.getAttribute("data-asunto") || "Nuevo mensaje desde MEDIC BOX";
      const res = await enviarFormulario(form, { subject: asunto });

      mostrarEstadoForm(estado, res.mensaje, res.demo ? "demo" : (res.ok ? "ok" : "error"));
      if(btn){ btn.disabled = false; btn.innerHTML = textoOriginal; }
      if(res.ok) form.reset();
    });
  });
}

document.addEventListener("DOMContentLoaded", conectarFormularios);

window.enviarFormulario = enviarFormulario;
window.hayClaveWeb3 = hayClaveWeb3;
window.mostrarEstadoForm = mostrarEstadoForm;
