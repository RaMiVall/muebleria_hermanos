/* ========================================================================
    PÁGINA DE INICIO — index.html
    Renderiza los productos destacados y controla el carrusel.
    Depende de js/productos.js y js/ui.js (deben cargarse antes que este).
   ======================================================================== */

/* ------------------------------------------------------------------------
    CARRUSEL
    Se mueve de a una "página" completa. La cantidad de tarjetas por página
    la define el CSS en la variable --cards-per-view, así que el JS no
    duplica los breakpoints: los lee.
   ------------------------------------------------------------------------ */

function iniciarCarrusel(cantidadProductos) {
    const viewport = document.querySelector(".products-viewport");
    const track = document.querySelector(".products-track");
    const botonPrev = document.querySelector(".carousel-btn-prev");
    const botonNext = document.querySelector(".carousel-btn-next");
    const contenedorDots = document.querySelector(".carousel-dots");

    let paginaActual = 0;

    /* Lee del CSS cuántas tarjetas entran en pantalla ahora mismo */
    function tarjetasPorPagina() {
        const valor = getComputedStyle(track).getPropertyValue("--cards-per-view");
        return Number(valor.trim()) || 1;
    }

    function totalPaginas() {
        return Math.ceil(cantidadProductos / tarjetasPorPagina());
    }

    /* Separación entre tarjetas, en píxeles, tal como la aplica el CSS */
    function separacion() {
        return parseFloat(getComputedStyle(track).columnGap) || 0;
    }

    /* Dibuja un punto por página y marca el activo */
    function renderizarDots() {
        contenedorDots.innerHTML = "";

        for (let i = 0; i < totalPaginas(); i++) {
            const dot = document.createElement("button");
            dot.className = i === paginaActual ? "dot active" : "dot";
            dot.type = "button";
            dot.setAttribute("aria-label", `Ir a la página ${i + 1}`);
            dot.addEventListener("click", () => irA(i));
            contenedorDots.appendChild(dot);
        }
    }

    /* Aplica el desplazamiento y sincroniza los controles */
    function actualizar() {
        const paginas = totalPaginas();

        /* Al achicar la ventana puede haber menos páginas que antes */
        if (paginaActual > paginas - 1) {
            paginaActual = paginas - 1;
        }

        const desplazamiento = paginaActual * (viewport.clientWidth + separacion());
        track.style.transform = `translateX(-${desplazamiento}px)`;

        renderizarDots();
    }

    function irA(pagina) {
        const paginas = totalPaginas();

        /* Circular: del final vuelve al principio y viceversa */
        paginaActual = (pagina + paginas) % paginas;
        actualizar();
    }

    botonPrev.addEventListener("click", () => irA(paginaActual - 1));
    botonNext.addEventListener("click", () => irA(paginaActual + 1));

    /* Al rotar el celular o redimensionar cambian las tarjetas por página */
    window.addEventListener("resize", actualizar);

    actualizar();
}

async function iniciarInicio() {
    const track = document.querySelector(".products-track");

    if (!track) {
        return;
    }

    mostrarCargando(track);

    try {
        const destacados = await obtenerDestacados();
        renderizarProductos(destacados, track);
        iniciarCarrusel(destacados.length);
    } catch (error) {
        console.error("Error al cargar los destacados:", error);
        mostrarError(track);
    }
}

document.addEventListener("DOMContentLoaded", iniciarInicio);
