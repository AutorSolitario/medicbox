/* ============================================================
   MEDIC BOX — Base de datos de productos (Anexo B)
   Fuente única de verdad para tienda, ficha, carrito y quiz.
   Todos los precios en USD. Estados: 'disponible' | 'proximamente' | 'revision'
   ============================================================ */

const CATEGORIAS = [
  { id: "estuches",     nombre: "Estuches térmicos",     icono: "fa-briefcase-medical" },
  { id: "geles",        nombre: "Geles y recargas",       icono: "fa-snowflake" },
  { id: "temperatura",  nombre: "Control de temperatura", icono: "fa-temperature-half" },
  { id: "organizacion", nombre: "Organización interna",   icono: "fa-layer-group" },
  { id: "proteccion",   nombre: "Protección y transporte",icono: "fa-shield-halved" },
  { id: "identificacion",nombre:"Identificación médica",  icono: "fa-id-card" },
  { id: "limpieza",     nombre: "Limpieza y repuestos",   icono: "fa-broom" },
  { id: "kits",         nombre: "Kits y promociones",     icono: "fa-box-open" }
];

const PRODUCTOS = [
  /* ---------- 1. Estuches térmicos ---------- */
  {
    id:"mini", nombre:"MEDIC BOX Mini", categoria:"estuches", precio:19.90, estado:"proximamente",
    estrellas:4.5, img:"img/estuche-mini.svg", personalizable:false,
    badges:["frio"], resumen:"Estuche compacto para una dosis diaria. Ideal para salidas cortas.",
    descripcion:"El modelo más compacto de la familia MEDIC BOX, pensado para quienes solo necesitan transportar una dosis durante salidas cortas. Ligero, discreto y con aislamiento térmico eficiente.",
    beneficios:["Ultraligero y discreto","Aislamiento térmico eficiente","Cabe en cualquier bolso"],
    incluye:["1 estuche Mini","2 geles refrigerantes","Guía de uso"],
    dimensiones:"12 × 9 × 5 cm", colores:["Azul","Gris","Amarillo"], compatibilidad:"1 lapicera de insulina o blíster pequeño"
  },
  {
    id:"original", nombre:"MEDIC BOX Original", categoria:"estuches", precio:25.00, estado:"disponible",
    estrellas:5, img:"img/estuche-original.svg", personalizable:true, destacado:true, oferta:"MÁS VENDIDO",
    badges:["frio","pers","envio"], resumen:"Nuestro estuche insignia. Conserva la cadena de frío durante tus actividades diarias.",
    descripcion:"El corazón de MEDIC BOX. Diseñado para transportar insulinas y medicamentos termolábiles conservando la cadena de frío durante las actividades diarias. Incluye compartimento interno organizado y cuatro geles reutilizables.",
    beneficios:["Conserva el frío 6–8 horas","Cuatro geles reutilizables","Compartimento interno organizado","Materiales resistentes y lavables","Totalmente personalizable"],
    incluye:["1 estuche Original (18×13×7 cm)","4 geles refrigerantes","Compartimento interno","Guía de uso"],
    dimensiones:"18 × 13 × 7 cm — capacidad para varias lapiceras y blísteres",
    colores:["Azul","Gris","Amarillo","Blanco"], compatibilidad:"Lapiceras de insulina, viales, blísteres y ampollas"
  },
  {
    id:"kids", nombre:"MEDIC BOX Kids", categoria:"estuches", precio:29.90, estado:"disponible",
    estrellas:5, img:"img/estuche-kids.svg", personalizable:true,
    badges:["frio","pers","envio"], resumen:"Diseño infantil con tarjeta de emergencia y nombre personalizado.",
    descripcion:"Pensado para los más pequeños: diseño infantil colorido, tarjeta de emergencia y espacio para el nombre del niño. Ayuda a que el tratamiento acompañe al niño en la escuela y en sus actividades con total seguridad.",
    beneficios:["Diseño infantil atractivo","Tarjeta de emergencia incluida","Nombre personalizado","Cuatro geles reutilizables"],
    incluye:["1 estuche Kids","4 geles refrigerantes","Tarjeta de emergencia","Espacio para nombre"],
    dimensiones:"18 × 13 × 7 cm", colores:["Azul","Amarillo","Celeste"], compatibilidad:"Lapiceras de insulina y viales pediátricos"
  },
  {
    id:"senior", nombre:"MEDIC BOX Senior", categoria:"estuches", precio:29.90, estado:"proximamente",
    estrellas:4.5, img:"img/estuche-senior.svg", personalizable:false,
    badges:["frio"], resumen:"Apertura sencilla y etiquetas de gran tamaño para adultos mayores.",
    descripcion:"Diseñado pensando en adultos mayores: apertura sencilla, etiquetas de gran tamaño y compartimentos claramente identificados para facilitar el uso diario.",
    beneficios:["Apertura sencilla","Etiquetas de gran tamaño","Compartimentos identificados"],
    incluye:["1 estuche Senior","4 geles refrigerantes","Etiquetas grandes"],
    dimensiones:"18 × 13 × 7 cm", colores:["Azul","Gris"], compatibilidad:"Lapiceras, viales y blísteres"
  },
  {
    id:"plus", nombre:"MEDIC BOX Plus", categoria:"estuches", precio:32.90, estado:"proximamente",
    estrellas:4.5, img:"img/estuche-plus.svg", personalizable:false,
    badges:["frio"], resumen:"Mayor capacidad para tratamientos combinados.",
    descripcion:"Más espacio para quienes manejan tratamientos combinados. Capacidad ampliada y organización interna reforzada.",
    beneficios:["Capacidad ampliada","Organización interna reforzada","Ideal para tratamientos combinados"],
    incluye:["1 estuche Plus","4 geles refrigerantes","Separadores"],
    dimensiones:"21 × 15 × 8 cm", colores:["Azul","Gris","Blanco"], compatibilidad:"Múltiples medicamentos termolábiles"
  },
  {
    id:"travel", nombre:"MEDIC BOX Travel", categoria:"estuches", precio:39.90, estado:"disponible",
    estrellas:5, img:"img/estuche-travel.svg", personalizable:false,
    badges:["frio","envio"], resumen:"Para viajes largos: seis geles, correa, etiqueta y checklist de viaje.",
    descripcion:"El compañero de viaje ideal. Incluye seis geles para mayor autonomía térmica, correa ajustable, etiqueta identificadora y un práctico checklist de viaje. Pensado para trayectos prolongados y vacaciones.",
    beneficios:["Seis geles para mayor autonomía","Correa ajustable incluida","Etiqueta de viaje","Checklist de viaje impreso","Mayor capacidad"],
    incluye:["1 estuche Travel","6 geles refrigerantes","Correa ajustable","Etiqueta identificadora","Checklist de viaje"],
    dimensiones:"22 × 16 × 9 cm", colores:["Azul","Gris","Negro"], compatibilidad:"Lapiceras, viales, blísteres y ampollas — alta capacidad"
  },
  {
    id:"smart", nombre:"MEDIC BOX Smart", categoria:"estuches", precio:44.90, estado:"disponible",
    estrellas:5, img:"img/estuche-smart.svg", personalizable:false,
    badges:["frio","envio"], resumen:"Con termómetro digital y separadores para monitorear la temperatura.",
    descripcion:"Tecnología al servicio de tu tratamiento. Incorpora un termómetro digital para visualizar la temperatura interna y separadores para una organización precisa. Ideal para quienes desean un control adicional.",
    beneficios:["Termómetro digital integrado","Separadores incluidos","Cuatro geles reutilizables","Monitoreo de temperatura"],
    incluye:["1 estuche Smart","4 geles refrigerantes","Termómetro digital","Separadores"],
    dimensiones:"19 × 14 × 8 cm", colores:["Azul","Gris"], compatibilidad:"Lapiceras, viales y blísteres"
  },
  {
    id:"pro", nombre:"MEDIC BOX Pro", categoria:"estuches", precio:49.90, estado:"proximamente",
    estrellas:5, img:"img/estuche-pro.svg", personalizable:false,
    badges:["frio"], resumen:"La versión más completa para uso intensivo.",
    descripcion:"La versión más completa de MEDIC BOX, para uso intensivo y necesidades exigentes. Máxima autonomía térmica, control de temperatura y organización profesional.",
    beneficios:["Máxima autonomía térmica","Control de temperatura","Organización profesional"],
    incluye:["1 estuche Pro","6 geles refrigerantes","Termómetro con alarma","Separadores profesionales"],
    dimensiones:"23 × 17 × 9 cm", colores:["Azul","Gris","Negro"], compatibilidad:"Uso intensivo — alta capacidad"
  },

  /* ---------- 2. Geles y recargas ---------- */
  { id:"gel-1", nombre:"Gel refrigerante individual", categoria:"geles", precio:2.50, estado:"disponible", estrellas:4.5, img:"img/gel.svg", badges:["frio"], resumen:"Gel refrigerante reutilizable individual.", descripcion:"Gel refrigerante reutilizable individual. Congélalo 6–8 horas antes de usar para mantener la cadena de frío.", beneficios:["Reutilizable","Atóxico","Compatible con todos los modelos"], incluye:["1 gel refrigerante"], dimensiones:"Estándar MEDIC BOX", compatibilidad:"Todos los modelos" },
  { id:"gel-2", nombre:"Pack de 2 geles", categoria:"geles", precio:4.50, estado:"disponible", estrellas:4.5, img:"img/gel.svg", badges:["frio"], resumen:"Pack de 2 geles refrigerantes reutilizables.", descripcion:"Pack de dos geles refrigerantes reutilizables para reemplazo o refuerzo térmico.", beneficios:["Reutilizables","Atóxicos"], incluye:["2 geles refrigerantes"], dimensiones:"Estándar", compatibilidad:"Todos los modelos" },
  { id:"gel-4", nombre:"Pack de 4 geles", categoria:"geles", precio:8.00, estado:"disponible", estrellas:5, img:"img/gel.svg", badges:["frio"], resumen:"Pack de 4 geles — el reemplazo ideal del Original.", descripcion:"Pack de cuatro geles refrigerantes, el reemplazo ideal para el modelo Original.", beneficios:["Reutilizables","Reemplazo directo del Original"], incluye:["4 geles refrigerantes"], dimensiones:"Estándar", compatibilidad:"Original, Kids, Smart" },
  { id:"gel-6", nombre:"Pack de 6 geles", categoria:"geles", precio:11.50, estado:"disponible", estrellas:5, img:"img/gel.svg", badges:["frio"], resumen:"Pack de 6 geles — pensado para el modelo Travel.", descripcion:"Pack de seis geles refrigerantes, pensado para el modelo Travel y viajes largos.", beneficios:["Reutilizables","Mayor autonomía"], incluye:["6 geles refrigerantes"], dimensiones:"Estándar", compatibilidad:"Travel, Pro" },
  { id:"caps-slim", nombre:"MEDIC CAPS Slim", categoria:"geles", precio:2.90, estado:"disponible", estrellas:4.5, img:"img/gel.svg", badges:["frio"], resumen:"Cápsula refrigerante ultradelgada.", descripcion:"Cápsula refrigerante slim para espacios reducidos manteniendo el frío.", beneficios:["Perfil delgado","Reutilizable"], incluye:["1 MEDIC CAPS Slim"], dimensiones:"Slim", compatibilidad:"Mini, Original" },
  { id:"caps-duo", nombre:"MEDIC CAPS Duo", categoria:"geles", precio:5.00, estado:"disponible", estrellas:4.5, img:"img/gel.svg", badges:["frio"], resumen:"Dos cápsulas refrigerantes slim.", descripcion:"Set de dos cápsulas refrigerantes slim para refuerzo térmico.", beneficios:["Reutilizables","Perfil delgado"], incluye:["2 MEDIC CAPS Slim"], dimensiones:"Slim", compatibilidad:"Original, Kids" },
  { id:"caps-travel", nombre:"MEDIC CAPS Travel (4)", categoria:"geles", precio:10.90, estado:"disponible", estrellas:5, img:"img/gel.svg", badges:["frio","envio"], resumen:"Cuatro cápsulas slim para viajar.", descripcion:"Cuatro cápsulas refrigerantes slim ideales para viajes y mayor autonomía.", beneficios:["Reutilizables","Ideal para viaje"], incluye:["4 MEDIC CAPS Slim"], dimensiones:"Slim", compatibilidad:"Travel, Pro" },
  { id:"kit-mixto-6", nombre:"Kit mixto de 6 geles", categoria:"geles", precio:13.90, estado:"disponible", estrellas:5, img:"img/gel.svg", badges:["frio"], resumen:"Combinación de geles y cápsulas slim.", descripcion:"Kit mixto que combina geles estándar y cápsulas slim para adaptarse a cualquier modelo.", beneficios:["Versátil","Reutilizables"], incluye:["Geles y cápsulas surtidos (6)"], dimensiones:"Mixto", compatibilidad:"Todos los modelos" },

  /* ---------- 3. Control de temperatura ---------- */
  { id:"termo-basico", nombre:"Termómetro digital básico", categoria:"temperatura", precio:9.90, estado:"disponible", estrellas:4.5, img:"img/termometro.svg", badges:[], resumen:"Visualiza la temperatura interna del estuche.", descripcion:"Termómetro digital básico para visualizar la temperatura interna del estuche. Complemento de monitoreo.", beneficios:["Lectura clara","Compacto"], incluye:["1 termómetro digital"], dimensiones:"Compacto", compatibilidad:"Todos los modelos", aviso:"Es un complemento de monitoreo; no garantiza por sí solo la conservación." },
  { id:"termo-alarma", nombre:"Termómetro con alarma", categoria:"temperatura", precio:17.90, estado:"disponible", estrellas:5, img:"img/termometro.svg", badges:[], resumen:"Alerta cuando la temperatura sale del rango.", descripcion:"Termómetro digital con alarma que avisa cuando la temperatura sale del rango recomendado.", beneficios:["Alarma configurable","Monitoreo continuo"], incluye:["1 termómetro con alarma"], dimensiones:"Compacto", compatibilidad:"Todos los modelos", aviso:"Es un complemento de monitoreo; no garantiza por sí solo la conservación." },
  { id:"indicador", nombre:"Indicador térmico reutilizable", categoria:"temperatura", precio:7.90, estado:"disponible", estrellas:4, img:"img/termometro.svg", badges:[], resumen:"Indicador visual de temperatura reutilizable.", descripcion:"Indicador térmico reutilizable que muestra de forma visual el estado de la temperatura.", beneficios:["Sin baterías","Reutilizable"], incluye:["1 indicador térmico"], dimensiones:"Adhesivo", compatibilidad:"Todos los modelos", aviso:"Es un complemento de monitoreo; no garantiza por sí solo la conservación." },
  { id:"protector-termo", nombre:"Protector de termómetro", categoria:"temperatura", precio:3.50, estado:"disponible", estrellas:4, img:"img/termometro.svg", badges:[], resumen:"Funda protectora para el termómetro.", descripcion:"Protector que resguarda el termómetro de golpes y humedad.", beneficios:["Protege el equipo","Ligero"], incluye:["1 protector"], dimensiones:"Universal", compatibilidad:"Termómetros MEDIC BOX" },
  { id:"pack-control", nombre:"Pack Control", categoria:"temperatura", precio:11.90, estado:"disponible", estrellas:5, img:"img/termometro.svg", badges:["envio"], resumen:"Termómetro + indicador + protector.", descripcion:"Pack de monitoreo que reúne termómetro, indicador y protector a precio conveniente.", beneficios:["Ahorro en conjunto","Monitoreo completo"], incluye:["Termómetro básico","Indicador térmico","Protector"], dimensiones:"Varios", compatibilidad:"Todos los modelos", aviso:"Son complementos de monitoreo; no garantizan por sí solos la conservación." },

  /* ---------- 4. Organización interna ---------- */
  { id:"separador", nombre:"Separador interno", categoria:"organizacion", precio:3.50, estado:"disponible", estrellas:4.5, img:"img/accesorio.svg", badges:[], resumen:"Separa el medicamento de los geles.", descripcion:"Separador interno para mantener el medicamento sin contacto directo con los geles.", beneficios:["Evita contacto con geles","Ajustable"], incluye:["1 separador"], dimensiones:"Universal", compatibilidad:"Original, Kids, Smart, Travel" },
  { id:"set-3-sep", nombre:"Set de 3 separadores", categoria:"organizacion", precio:7.90, estado:"disponible", estrellas:5, img:"img/accesorio.svg", badges:[], resumen:"Tres separadores para máxima organización.", descripcion:"Set de tres separadores para una organización interna precisa.", beneficios:["Máxima organización","Ajustables"], incluye:["3 separadores"], dimensiones:"Universal", compatibilidad:"Original, Plus, Travel, Pro" },
  { id:"estuche-gluco", nombre:"Estuche para glucómetro", categoria:"organizacion", precio:7.90, estado:"disponible", estrellas:4.5, img:"img/accesorio.svg", badges:[], resumen:"Protege y organiza tu glucómetro.", descripcion:"Estuche dedicado para transportar y proteger el glucómetro junto a tu MEDIC BOX.", beneficios:["Protege el glucómetro","Compacto"], incluye:["1 estuche para glucómetro"], dimensiones:"Compacto", compatibilidad:"Universal" },
  { id:"org-agujas", nombre:"Organizador de agujas/lancetas", categoria:"organizacion", precio:4.90, estado:"disponible", estrellas:4.5, img:"img/accesorio.svg", badges:[], resumen:"Guarda agujas y lancetas de forma segura.", descripcion:"Organizador para guardar agujas y lancetas de forma ordenada y segura.", beneficios:["Orden y seguridad","Compacto"], incluye:["1 organizador"], dimensiones:"Compacto", compatibilidad:"Universal" },
  { id:"portaampollas", nombre:"Portaampollas", categoria:"organizacion", precio:5.90, estado:"disponible", estrellas:4.5, img:"img/accesorio.svg", badges:[], resumen:"Sujeta ampollas y viales sin movimiento.", descripcion:"Portaampollas que sujeta viales y ampollas evitando movimientos durante el traslado.", beneficios:["Sujeción firme","Protege el vidrio"], incluye:["1 portaampollas"], dimensiones:"Universal", compatibilidad:"Viales y ampollas" },
  { id:"bolsillo-int", nombre:"Bolsillo interno", categoria:"organizacion", precio:3.90, estado:"disponible", estrellas:4, img:"img/accesorio.svg", badges:[], resumen:"Espacio extra para accesorios pequeños.", descripcion:"Bolsillo interno adicional para accesorios pequeños y documentos.", beneficios:["Espacio extra","Fácil de instalar"], incluye:["1 bolsillo interno"], dimensiones:"Universal", compatibilidad:"Original, Plus, Travel" },
  { id:"banda-elastica", nombre:"Banda elástica", categoria:"organizacion", precio:2.90, estado:"disponible", estrellas:4, img:"img/accesorio.svg", badges:[], resumen:"Sujeta lapiceras y accesorios.", descripcion:"Banda elástica interna para sujetar lapiceras y accesorios en su lugar.", beneficios:["Sujeción práctica","Reutilizable"], incluye:["1 banda elástica"], dimensiones:"Universal", compatibilidad:"Todos los modelos" },
  { id:"pack-org", nombre:"Pack Organización", categoria:"organizacion", precio:9.90, estado:"disponible", estrellas:5, img:"img/accesorio.svg", badges:["envio"], resumen:"Separadores + bolsillo + banda a mejor precio.", descripcion:"Pack que reúne separadores, bolsillo interno y banda elástica para organizar tu estuche.", beneficios:["Ahorro en conjunto","Organización completa"], incluye:["Set de separadores","Bolsillo interno","Banda elástica"], dimensiones:"Varios", compatibilidad:"Original, Plus, Travel, Pro" },

  /* ---------- 5. Protección y transporte ---------- */
  { id:"correa", nombre:"Correa ajustable", categoria:"proteccion", precio:4.50, estado:"disponible", estrellas:4.5, img:"img/accesorio.svg", badges:[], resumen:"Lleva tu estuche cómodamente al hombro.", descripcion:"Correa ajustable para transportar el estuche cómodamente al hombro o cruzado.", beneficios:["Ajustable","Cómoda"], incluye:["1 correa ajustable"], dimensiones:"Universal", compatibilidad:"Todos los modelos" },
  { id:"funda-imp", nombre:"Funda impermeable", categoria:"proteccion", precio:7.90, estado:"disponible", estrellas:5, img:"img/accesorio.svg", badges:[], resumen:"Protege tu estuche de la lluvia.", descripcion:"Funda impermeable que protege el estuche frente a la lluvia y salpicaduras.", beneficios:["Impermeable","Ligera"], incluye:["1 funda impermeable"], dimensiones:"Universal", compatibilidad:"Todos los modelos" },
  { id:"funda-lavable", nombre:"Funda interior lavable", categoria:"proteccion", precio:5.90, estado:"disponible", estrellas:4.5, img:"img/accesorio.svg", badges:[], resumen:"Higiene extra: funda interior lavable.", descripcion:"Funda interior lavable que facilita la higiene del estuche.", beneficios:["Lavable","Higiénica"], incluye:["1 funda interior lavable"], dimensiones:"Universal", compatibilidad:"Original, Plus, Travel" },
  { id:"protector-rigido", nombre:"Protector rígido interno", categoria:"proteccion", precio:6.90, estado:"disponible", estrellas:4.5, img:"img/accesorio.svg", badges:[], resumen:"Refuerza la protección de tu medicamento.", descripcion:"Protector rígido interno que refuerza la protección del medicamento frente a golpes.", beneficios:["Protección reforzada","Encaje preciso"], incluye:["1 protector rígido"], dimensiones:"Universal", compatibilidad:"Original, Plus, Travel" },
  { id:"asa", nombre:"Asa de transporte", categoria:"proteccion", precio:3.90, estado:"disponible", estrellas:4, img:"img/accesorio.svg", badges:[], resumen:"Asa adicional para llevar en mano.", descripcion:"Asa de transporte adicional para llevar el estuche cómodamente en la mano.", beneficios:["Cómoda","Resistente"], incluye:["1 asa de transporte"], dimensiones:"Universal", compatibilidad:"Todos los modelos" },
  { id:"mosqueton", nombre:"Mosquetón", categoria:"proteccion", precio:2.90, estado:"disponible", estrellas:4, img:"img/accesorio.svg", badges:[], resumen:"Engancha tu estuche a mochilas o bolsos.", descripcion:"Mosquetón resistente para enganchar el estuche a mochilas, bolsos o cinturones.", beneficios:["Resistente","Práctico"], incluye:["1 mosquetón"], dimensiones:"Universal", compatibilidad:"Todos los modelos" },
  { id:"pack-prot", nombre:"Pack Protección", categoria:"proteccion", precio:12.90, estado:"disponible", estrellas:5, img:"img/accesorio.svg", badges:["envio"], resumen:"Correa + funda impermeable + mosquetón.", descripcion:"Pack de protección y transporte que combina correa, funda impermeable y mosquetón.", beneficios:["Ahorro en conjunto","Protección completa"], incluye:["Correa ajustable","Funda impermeable","Mosquetón"], dimensiones:"Varios", compatibilidad:"Todos los modelos" },

  /* ---------- 6. Identificación médica ---------- */
  { id:"tarjeta-med", nombre:"Tarjeta médica personalizada", categoria:"identificacion", precio:3.00, estado:"disponible", estrellas:4.5, img:"img/identificacion.svg", badges:["pers"], resumen:"Datos médicos esenciales siempre contigo.", descripcion:"Tarjeta médica personalizada con los datos esenciales del paciente. Solicitamos únicamente los datos necesarios; su uso es identificar al paciente ante una emergencia.", beneficios:["Datos esenciales","Personalizable"], incluye:["1 tarjeta médica"], dimensiones:"Formato billetera", compatibilidad:"Universal" },
  { id:"etiqueta-emerg", nombre:"Etiqueta de emergencia", categoria:"identificacion", precio:2.50, estado:"disponible", estrellas:4.5, img:"img/identificacion.svg", badges:["pers"], resumen:"Identifica el estuche ante una emergencia.", descripcion:"Etiqueta de emergencia para identificar rápidamente el estuche y al paciente. Solicitamos solo los datos necesarios.", beneficios:["Identificación rápida","Adhesiva"], incluye:["1 etiqueta de emergencia"], dimensiones:"Adhesiva", compatibilidad:"Todos los modelos" },
  { id:"etiqueta-bil", nombre:"Etiqueta bilingüe", categoria:"identificacion", precio:3.50, estado:"disponible", estrellas:4.5, img:"img/identificacion.svg", badges:["pers"], resumen:"Español e inglés para viajes internacionales.", descripcion:"Etiqueta bilingüe (español/inglés) ideal para viajes internacionales.", beneficios:["Bilingüe","Ideal para viajes"], incluye:["1 etiqueta bilingüe"], dimensiones:"Adhesiva", compatibilidad:"Todos los modelos" },
  { id:"pulsera", nombre:"Pulsera de identificación", categoria:"identificacion", precio:5.90, estado:"disponible", estrellas:5, img:"img/identificacion.svg", badges:["pers"], resumen:"Identificación médica siempre puesta.", descripcion:"Pulsera de identificación médica cómoda y resistente. Solicitamos solo los datos necesarios.", beneficios:["Cómoda","Resistente al agua"], incluye:["1 pulsera"], dimensiones:"Ajustable", compatibilidad:"Universal" },
  { id:"placa", nombre:"Placa de identificación", categoria:"identificacion", precio:4.90, estado:"disponible", estrellas:4.5, img:"img/identificacion.svg", badges:["pers"], resumen:"Placa metálica grabada.", descripcion:"Placa metálica de identificación grabada con los datos necesarios del paciente.", beneficios:["Metálica","Grabado duradero"], incluye:["1 placa"], dimensiones:"Estándar", compatibilidad:"Universal" },
  { id:"kit-etiq-viaje", nombre:"Kit de etiquetas de viaje", categoria:"identificacion", precio:3.90, estado:"disponible", estrellas:4.5, img:"img/identificacion.svg", badges:["pers"], resumen:"Set de etiquetas para tus viajes.", descripcion:"Kit de etiquetas de viaje para identificar tu estuche y equipaje.", beneficios:["Set completo","Adhesivas"], incluye:["Set de etiquetas de viaje"], dimensiones:"Varias", compatibilidad:"Todos los modelos" },
  { id:"pack-id", nombre:"Pack Identificación", categoria:"identificacion", precio:9.90, estado:"disponible", estrellas:5, img:"img/identificacion.svg", badges:["pers","envio"], resumen:"Tarjeta + etiqueta + pulsera.", descripcion:"Pack de identificación médica que reúne tarjeta, etiqueta y pulsera. Solicitamos solo los datos necesarios.", beneficios:["Ahorro en conjunto","Identificación completa"], incluye:["Tarjeta médica","Etiqueta de emergencia","Pulsera"], dimensiones:"Varios", compatibilidad:"Universal" },

  /* ---------- 7. Limpieza y repuestos ---------- */
  { id:"pano", nombre:"Paño de limpieza", categoria:"limpieza", precio:1.90, estado:"disponible", estrellas:4, img:"img/limpieza.svg", badges:[], resumen:"Paño suave para la limpieza diaria.", descripcion:"Paño suave para limpiar el estuche sin dañar los materiales.", beneficios:["Suave","Reutilizable"], incluye:["1 paño"], dimensiones:"Estándar", compatibilidad:"Todos los modelos" },
  { id:"kit-limpieza", nombre:"Kit de limpieza", categoria:"limpieza", precio:4.90, estado:"disponible", estrellas:4.5, img:"img/limpieza.svg", badges:[], resumen:"Todo para mantener tu estuche impecable.", descripcion:"Kit de limpieza con paño y solución suave para mantener el estuche higiénico.", beneficios:["Higiene completa","Seguro para los materiales"], incluye:["Paño","Solución de limpieza"], dimensiones:"Varios", compatibilidad:"Todos los modelos" },
  { id:"bolsa-geles", nombre:"Bolsa organizadora de geles", categoria:"limpieza", precio:2.90, estado:"disponible", estrellas:4, img:"img/limpieza.svg", badges:[], resumen:"Guarda tus geles en el congelador.", descripcion:"Bolsa para organizar y almacenar los geles en el congelador.", beneficios:["Orden en el congelador","Reutilizable"], incluye:["1 bolsa organizadora"], dimensiones:"Estándar", compatibilidad:"Geles MEDIC BOX" },
  { id:"rep-cierre", nombre:"Repuesto de cierre", categoria:"limpieza", precio:4.90, estado:"revision", estrellas:4, img:"img/limpieza.svg", badges:[], resumen:"Repuesto de cierre (según el daño).", descripcion:"Repuesto de cierre para tu estuche. El precio final depende del tipo de daño; solicita una revisión y te orientamos.", beneficios:["Alarga la vida útil","Instalación guiada"], incluye:["Repuesto de cierre"], dimensiones:"Según modelo", compatibilidad:"Estuches MEDIC BOX", desde:true },
  { id:"rep-malla", nombre:"Repuesto de malla", categoria:"limpieza", precio:4.50, estado:"revision", estrellas:4, img:"img/limpieza.svg", badges:[], resumen:"Repuesto de malla interna (según el daño).", descripcion:"Repuesto de malla interna. El precio final depende del tipo de daño; solicita una revisión.", beneficios:["Restaura el interior","Instalación guiada"], incluye:["Repuesto de malla"], dimensiones:"Según modelo", compatibilidad:"Estuches MEDIC BOX", desde:true },
  { id:"funda-reemplazo", nombre:"Funda interior de reemplazo", categoria:"limpieza", precio:5.90, estado:"disponible", estrellas:4.5, img:"img/limpieza.svg", badges:[], resumen:"Renueva el interior de tu estuche.", descripcion:"Funda interior de reemplazo para renovar la higiene del estuche.", beneficios:["Renueva el interior","Lavable"], incluye:["1 funda interior"], dimensiones:"Según modelo", compatibilidad:"Original, Plus, Travel" },
  { id:"kit-mant", nombre:"Kit de mantenimiento", categoria:"limpieza", precio:7.90, estado:"disponible", estrellas:5, img:"img/limpieza.svg", badges:[], resumen:"Limpieza + repuestos básicos.", descripcion:"Kit de mantenimiento con elementos de limpieza y repuestos básicos.", beneficios:["Mantenimiento integral","Práctico"], incluye:["Kit de limpieza","Repuestos básicos"], dimensiones:"Varios", compatibilidad:"Todos los modelos" },
  { id:"pack-mant", nombre:"Pack Mantenimiento", categoria:"limpieza", precio:9.90, estado:"disponible", estrellas:5, img:"img/limpieza.svg", badges:["envio"], resumen:"Todo lo necesario para el cuidado a largo plazo.", descripcion:"Pack completo de mantenimiento para el cuidado del estuche a largo plazo.", beneficios:["Ahorro en conjunto","Cuidado a largo plazo"], incluye:["Kit de limpieza","Funda interior","Repuestos"], dimensiones:"Varios", compatibilidad:"Todos los modelos" },

  /* ---------- 8. Kits y promociones ---------- */
  { id:"kit-esencial", nombre:"Kit Esencial", categoria:"kits", precio:25.00, estado:"disponible", estrellas:5, img:"img/kit.svg", badges:["frio","envio"], resumen:"MEDIC BOX Original con lo esencial para empezar.", descripcion:"Kit Esencial con el estuche Original y los elementos básicos para comenzar a proteger tu tratamiento.", beneficios:["Todo para empezar","Mejor precio"], incluye:["MEDIC BOX Original","4 geles","Guía de uso"], dimensiones:"—", compatibilidad:"Uso diario" },
  { id:"kit-personalizado", nombre:"Kit Personalizado", categoria:"kits", precio:29.90, estado:"disponible", estrellas:5, img:"img/kit.svg", badges:["frio","pers","envio"], resumen:"Original + personalización a tu medida.", descripcion:"Kit Personalizado que incluye el estuche Original con nombre y tarjeta médica personalizada.", beneficios:["Personalización incluida","Identificación médica"], incluye:["MEDIC BOX Original","Nombre impreso","Tarjeta médica"], dimensiones:"—", compatibilidad:"Uso diario" },
  { id:"kit-cuidado", nombre:"Kit Cuidado Completo", categoria:"kits", precio:36.90, estado:"disponible", estrellas:5, img:"img/kit.svg", badges:["frio","envio"], resumen:"Estuche + protección + mantenimiento.", descripcion:"Kit Cuidado Completo que suma protección y mantenimiento al estuche Original.", beneficios:["Cuidado integral","Ahorro en conjunto"], incluye:["MEDIC BOX Original","Funda impermeable","Kit de limpieza"], dimensiones:"—", compatibilidad:"Uso diario" },
  { id:"kit-infantil", nombre:"Kit Infantil", categoria:"kits", precio:29.90, estado:"disponible", estrellas:5, img:"img/kit.svg", badges:["frio","pers","envio"], resumen:"Todo para los más pequeños.", descripcion:"Kit Infantil con el estuche Kids, tarjeta de emergencia y personalización con el nombre del niño.", beneficios:["Diseño infantil","Tarjeta de emergencia"], incluye:["MEDIC BOX Kids","Tarjeta de emergencia","Nombre personalizado"], dimensiones:"—", compatibilidad:"Niños" },
  { id:"kit-familiar", nombre:"Kit Familiar", categoria:"kits", precio:47.90, estado:"disponible", estrellas:5, img:"img/kit.svg", badges:["frio","envio"], resumen:"Para más de un miembro de la familia.", descripcion:"Kit Familiar pensado para hogares con más de un paciente. Mayor capacidad y accesorios compartidos.", beneficios:["Para toda la familia","Gran capacidad"], incluye:["2 estuches","Geles adicionales","Accesorios"], dimensiones:"—", compatibilidad:"Familias" },
  { id:"kit-viajero", nombre:"Kit Viajero", categoria:"kits", precio:49.90, estado:"disponible", estrellas:5, img:"img/kit.svg", badges:["frio","envio"], resumen:"Travel + accesorios para viajar tranquilo.", descripcion:"Kit Viajero con el estuche Travel, geles extra y accesorios pensados para viajes largos.", beneficios:["Listo para viajar","Máxima autonomía"], incluye:["MEDIC BOX Travel","Geles extra","Correa y etiqueta"], dimensiones:"—", compatibilidad:"Viajes" },
  { id:"kit-smart", nombre:"Kit Smart", categoria:"kits", precio:41.90, estado:"disponible", estrellas:5, img:"img/kit.svg", badges:["frio","envio"], resumen:"Smart + monitoreo de temperatura.", descripcion:"Kit Smart que reúne el estuche Smart con termómetro y elementos de monitoreo.", beneficios:["Control de temperatura","Tecnología integrada"], incluye:["MEDIC BOX Smart","Termómetro","Separadores"], dimensiones:"—", compatibilidad:"Uso con monitoreo" },
  { id:"pack-accesorios", nombre:"Pack Completo de accesorios", categoria:"kits", precio:22.90, estado:"disponible", estrellas:5, img:"img/kit.svg", badges:["envio"], resumen:"Todos los accesorios esenciales juntos.", descripcion:"Pack Completo de accesorios que reúne organización, protección e identificación a mejor precio.", beneficios:["Todo en uno","Máximo ahorro"], incluye:["Separadores","Correa","Etiquetas","Funda"], dimensiones:"Varios", compatibilidad:"Todos los modelos" }
];

/* Utilidades de acceso a datos */
function obtenerProducto(id){ return PRODUCTOS.find(p => p.id === id); }
function productosPorCategoria(catId){ return PRODUCTOS.filter(p => p.categoria === catId); }
function productosDestacados(){ return PRODUCTOS.filter(p => p.destacado || (p.estado==="disponible" && ["kids","travel","smart","kit-esencial"].includes(p.id))); }
function nombreCategoria(catId){ const c = CATEGORIAS.find(c=>c.id===catId); return c?c.nombre:catId; }

/* Exponer en window para páginas sin módulos */
window.CATEGORIAS = CATEGORIAS;
window.PRODUCTOS = PRODUCTOS;
window.obtenerProducto = obtenerProducto;
window.productosPorCategoria = productosPorCategoria;
window.productosDestacados = productosDestacados;
window.nombreCategoria = nombreCategoria;
