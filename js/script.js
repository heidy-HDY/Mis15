/* =========================================
   MÚSICA DE LA INVITACIÓN
   ========================================= */

const musica = document.getElementById("musica");
const botonMusica = document.getElementById("boton-musica");
const mensajeMusica = document.getElementById("mensaje-musica");


/* =========================================
   FUNCIÓN PARA MOSTRAR MENSAJE
   ========================================= */

function mostrarMensaje() {

    mensajeMusica.classList.add("visible");

    setTimeout(() => {
        mensajeMusica.classList.remove("visible");
    }, 3500);
}


/* =========================================
   ACTUALIZAR ICONO DEL BOTÓN
   ========================================= */

function actualizarBotonMusica() {

    if (musica.paused) {
        botonMusica.textContent = "🎵";
        botonMusica.setAttribute(
            "aria-label",
            "Activar música"
        );
    } else {
        botonMusica.textContent = "🔊";
        botonMusica.setAttribute(
            "aria-label",
            "Pausar música"
        );
    }
}


/* =========================================
   INTENTAR REPRODUCIR LA MÚSICA
   ========================================= */

function iniciarMusica() {

    musica.play()
        .then(() => {

            actualizarBotonMusica();

            mensajeMusica.classList.remove("visible");

        })
        .catch(() => {

            /*
               Algunos navegadores bloquean el
               sonido automático.

               En ese caso esperamos una interacción
               del usuario.
            */

            mostrarMensaje();

            actualizarBotonMusica();
        });
}


/* =========================================
   BOTÓN DE MÚSICA
   ========================================= */

botonMusica.addEventListener("click", function () {

    if (musica.paused) {

        musica.play()
            .then(() => {
                actualizarBotonMusica();
                mensajeMusica.classList.remove("visible");
            })
            .catch(() => {
                mostrarMensaje();
            });

    } else {

        musica.pause();

        actualizarBotonMusica();
    }

});


/* =========================================
   PRIMERA INTERACCIÓN CON LA INVITACIÓN
   ========================================= */

function primeraInteraccion() {

    if (musica.paused) {

        musica.play()
            .then(() => {

                actualizarBotonMusica();

                mensajeMusica.classList.remove("visible");

            })
            .catch(() => {

                actualizarBotonMusica();

            });
    }

}


/*
   Cualquier interacción del usuario puede
   activar la música si el navegador había
   bloqueado el autoplay.
*/

document.addEventListener(
    "click",
    primeraInteraccion,
    { once: true }
);

document.addEventListener(
    "touchstart",
    primeraInteraccion,
    { once: true }
);

document.addEventListener(
    "scroll", 
    primeraInteraccion, 
    { once: true, passive: true }
);


/* =========================================
   CUANDO LA MÚSICA CAMBIA DE ESTADO
   ========================================= */

musica.addEventListener("play", function () {
    actualizarBotonMusica();
});

musica.addEventListener("pause", function () {
    actualizarBotonMusica();
});


/* =========================================
   INTENTO DE AUTOPLAY AL CARGAR
   ========================================= */

window.addEventListener("load", function () {

    iniciarMusica();

});

/*ZONAS CLICABLES SOBRE LA IMAGEN
   ========================================= */

const imagenInvitacion = document.querySelector(".invitacion-imagen");

const zonasClicables = [
    {
        nombre: "ubicacion",
        top: 87.6, left: 36.4, width: 27.1, height: 1.9,
        url: "https://share.google/KlVnkWu9qmANBQm8F"
    },
    {
        nombre: "confirmar",
        top: 93.3, left: 36.4, width: 28.8, height: 2,
        url: "https://w.app/13l6iv"
    }
];

imagenInvitacion.addEventListener("click", function (e) {
    const rect = imagenInvitacion.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;

    for (const zona of zonasClicables) {
        if (
            xPct >= zona.left && xPct <= zona.left + zona.width &&
            yPct >= zona.top && yPct <= zona.top + zona.height
        ) {
            window.open(zona.url, "_blank");
            return;
        }
    }
    // Si tocas fuera de los botones, ya no pasa nada — así debe ser
});