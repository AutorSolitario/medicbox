/* ============================================================
   MEDIC BOX · "Mi Sapita" — Generador de contenido cifrado
   ------------------------------------------------------------
   Cifra tools/carta-fuente.html con la clave indicada y reescribe
   assets/js/sapita-content.js con el contenido cifrado (base64).

   Uso:
       node tools/encriptar.js "TU_CLAVE"
   Si no pasas la clave por argumento, se usa la variable de entorno
   SAPITA_CLAVE. La contraseña NUNCA se escribe en el archivo de salida:
   solo viaja el contenido cifrado, el salt y el IV.

   Cifrado:  PBKDF2 (SHA-256, 150 000 iteraciones) -> AES-GCM 256 bits, IV 12 bytes.
   Compatible con la Web Crypto API del navegador.
   ============================================================ */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ITERACIONES = 150000;
const clave = process.argv[2] || process.env.SAPITA_CLAVE;

if (!clave) {
  console.error('✖ Falta la clave. Uso: node tools/encriptar.js "TU_CLAVE"');
  process.exit(1);
}

const raizProyecto = path.resolve(__dirname, "..");
const rutaFuente = path.join(raizProyecto, "tools", "carta-fuente.html");
const rutaSalida = path.join(raizProyecto, "assets", "js", "sapita-content.js");

let textoPlano = fs.readFileSync(rutaFuente, "utf8");
// Elimina los comentarios HTML (documentación) para que solo se cifre la carta
textoPlano = textoPlano.replace(/<!--[\s\S]*?-->/g, "").trim();

const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);
const key = crypto.pbkdf2Sync(clave, salt, ITERACIONES, 32, "sha256");

const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
const cifrado = Buffer.concat([cipher.update(textoPlano, "utf8"), cipher.final()]);
const tag = cipher.getAuthTag();
// La Web Crypto API espera el tag de autenticación anexado al final del texto cifrado
const contenido = Buffer.concat([cifrado, tag]);

const salida = `/* ============================================================
   MEDIC BOX · "Mi Sapita" — Contenido cifrado (NO editar a mano)
   Generado por tools/encriptar.js el ${new Date().toISOString()}.
   Solo viajan el contenido cifrado, el salt y el IV (base64).
   La clave no está aquí: se introduce en el navegador para descifrar.
   ============================================================ */
window.SAPITA_CIFRADO = {
  iteraciones: ${ITERACIONES},
  salt: "${salt.toString("base64")}",
  iv: "${iv.toString("base64")}",
  contenido: "${contenido.toString("base64")}"
};
`;

fs.writeFileSync(rutaSalida, salida, "utf8");
console.log("✔ Cifrado correcto. Escrito en:", path.relative(raizProyecto, rutaSalida));
console.log("  salt:", salt.toString("base64"));
console.log("  iv  :", iv.toString("base64"));
console.log("  bytes cifrados:", contenido.length);
