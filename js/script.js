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
        top: 84.2,
        left: 39,
        width: 22,
        height: 3.6,
        url: "https://maps.app.goo.gl/RxhTFU9EkgkWLBkCA"
    },
    {
        nombre: "confirmar",
        top: 90.5,
        left: 39,
        width: 22,
        height: 3.8,
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

/* =========================================
   SOBRE DE BIENVENIDA
   ========================================= */

const sobre = document.getElementById("sobre");
const invitacionCard = document.querySelector(".invitacion");

sobre.addEventListener("click", function () {

    sobre.classList.add("abrir");

    setTimeout(() => {
        sobre.style.display = "none";
        invitacionCard.classList.add("mostrar");
    }, 800);

});