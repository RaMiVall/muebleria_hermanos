function iniciarCarrusel(cantidadProductos) {
    const viewport = document.querySelector(".products-viewport");
    const track = document.querySelector(".products-track");
    const botonPrev = document.querySelector(".carousel-btn-prev");
    const botonNext = document.querySelector(".carousel-btn-next");
    const contenedorDots = document.querySelector(".carousel-dots");

    let paginaActual = 0;

    function tarjetasPorPagina() {
        const valor = getComputedStyle(track).getPropertyValue("--cards-per-view");
        return Number(valor.trim()) || 1;
    }

    function totalPaginas() {
        return Math.ceil(cantidadProductos / tarjetasPorPagina());
    }

    function separacion() {
        return parseFloat(getComputedStyle(track).columnGap) || 0;
    }

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

    function actualizar() {
        const paginas = totalPaginas();

        if (paginaActual > paginas - 1) {
            paginaActual = paginas - 1;
        }

        const desplazamiento = paginaActual * (viewport.clientWidth + separacion());
        track.style.transform = `translateX(-${desplazamiento}px)`;

        renderizarDots();
    }

    function irA(pagina) {
        const paginas = totalPaginas();

        paginaActual = (pagina + paginas) % paginas;
        actualizar();
    }

    botonPrev.addEventListener("click", () => irA(paginaActual - 1));
    botonNext.addEventListener("click", () => irA(paginaActual + 1));

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
