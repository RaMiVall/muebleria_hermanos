/* ========================================================================
   CATÁLOGO DE PRODUCTOS — productos.html
   Renderiza la grilla completa y filtra con el campo de búsqueda.
   Depende de js/productos.js y js/ui.js (deben cargarse antes que este).
   ======================================================================== */

/* Evita disparar una búsqueda por cada tecla: espera a que el usuario
   deje de escribir durante este tiempo (en milisegundos) */
const ESPERA_BUSQUEDA = 300;

async function iniciarCatalogo() {
    const grilla = document.querySelector(".products-grid");
    const buscador = document.querySelector("#buscador");
    const contador = document.querySelector("#contador-resultados");

    if (!grilla) {
        return;
    }

    /* Muestra los resultados y actualiza el texto del contador */
    function pintar(productos, consulta) {
        if (productos.length === 0) {
            mostrarSinResultados(grilla, consulta);
            contador.textContent = "0 productos";
            return;
        }

        renderizarProductos(productos, grilla);
        contador.textContent = productos.length === 1
            ? "1 producto"
            : `${productos.length} productos`;
    }

    /* Carga inicial: catálogo completo */
    mostrarCargando(grilla);

    try {
        const productos = await obtenerProductos();
        pintar(productos, "");
    } catch (error) {
        console.error("Error al cargar el catálogo:", error);
        mostrarError(grilla);
        return;
    }

    /* Búsqueda en vivo mientras se escribe */
    let temporizador;

    buscador.addEventListener("input", () => {
        clearTimeout(temporizador);

        temporizador = setTimeout(async () => {
            const consulta = buscador.value;

            try {
                const resultados = await buscarProductos(consulta);
                pintar(resultados, consulta.trim());
            } catch (error) {
                console.error("Error en la búsqueda:", error);
                mostrarError(grilla);
            }
        }, ESPERA_BUSQUEDA);
    });

    /* Enter no debe recargar la página: la búsqueda ya es en vivo */
    buscador.closest("form").addEventListener("submit", (evento) => {
        evento.preventDefault();
    });
}

document.addEventListener("DOMContentLoaded", iniciarCatalogo);
