/* =========================================
   MÚSICA DE LA INVITACIÓN
   ========================================= */

const musica = document.getElementById("musica");


/* =========================================
   FUNCIÓN PARA ACTIVAR LA MÚSICA
   ========================================= */

function iniciarMusica() {

    if (musica.paused) {

        musica.play()
            .catch(() => {
                // El navegador puede bloquear el audio
                // hasta que exista una interacción válida.
            });

    }

}


/* =========================================
   PRIMERA INTERACCIÓN
   ========================================= */

/*
   Al tocar cualquier parte de la invitación,
   se intenta activar la música.
*/

document.addEventListener(
    "click",
    iniciarMusica,
    { once: true }
);


/*
   En celular, la primera interacción táctil
   también puede activar la música.
*/

document.addEventListener(
    "touchstart",
    iniciarMusica,
    { once: true }
);


/*
   Si la persona hace scroll, también se intenta
   activar la música.
*/

document.addEventListener(
    "scroll",
    iniciarMusica,
    { once: true, passive: true }
);


/* =========================================
   INTENTO DE AUTOPLAY AL CARGAR
   ========================================= */

window.addEventListener("load", function () {

    iniciarMusica();

});


/* =========================================
   ZONAS CLICABLES SOBRE LA IMAGEN
   ========================================= */

const imagenInvitacion = document.querySelector(".invitacion-imagen");

const zonasClicables = [
    {
        nombre: "ubicacion",
        top: 87.6,
        left: 36.4,
        width: 27.1,
        height: 1.9,
        url: "https://maps.app.goo.gl/RxhTFU9EkgkWLBkCA"
    },
    {
        nombre: "confirmar",
        top: 93.3,
        left: 36.4,
        width: 28.8,
        height: 2,
        url: "https://w.app/13l6iv"
    }
];


imagenInvitacion.addEventListener("click", function (e) {

    const rect = imagenInvitacion.getBoundingClientRect();

    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;

    for (const zona of zonasClicables) {

        if (
            xPct >= zona.left &&
            xPct <= zona.left + zona.width &&
            yPct >= zona.top &&
            yPct <= zona.top + zona.height
        ) {

            const enlace = document.createElement("a");

            enlace.href = zona.url;
            enlace.target = "_blank";
            enlace.rel = "noopener noreferrer";

            document.body.appendChild(enlace);
            enlace.click();
            enlace.remove();

            return;
        }
    }

});