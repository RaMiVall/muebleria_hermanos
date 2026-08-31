/* ========================================================================
   CAT�LOGO DE PRODUCTOS � productos.html
   Renderiza la grilla completa y filtra con el campo de b�squeda.
   Depende de js/productos.js y js/ui.js (deben cargarse antes que este).
   ======================================================================== */

/* Evita disparar una b�squeda por cada tecla: espera a que el usuario
   deje de escribir durante este tiempo (en milisegundos) */
const ESPERA_BUSQUEDA = 300;

async function cargarCategorias(filtro) {
    if (!filtro) {
        return;
    }

    const categorias = await obtenerCategorias();
    filtro.innerHTML = '<option value="">Todas las categorías</option>';

    for (const categoria of categorias) {
        const opcion = document.createElement("option");
        opcion.value = categoria;
        opcion.textContent = categoria;
        filtro.appendChild(opcion);
    }
}

async function iniciarCatalogo() {
    const grilla = document.querySelector(".products-grid");
    const buscador = document.querySelector("#buscador");
    const contador = document.querySelector("#contador-resultados");
    const filtro = document.querySelector("#category-filter");

    if (!grilla) {
        return;
    }

    let productosBase = [];
    let temporizador;

    function pintar(productos, consulta = "") {
        if (productos.length === 0) {
            const texto = consulta || (filtro && filtro.value ? `en ${filtro.value}` : "");
            mostrarSinResultados(grilla, texto);
            if (contador) {
                contador.textContent = "0 productos";
            }
            return;
        }

        renderizarProductos(productos, grilla);
        if (contador) {
            contador.textContent = `${productos.length} productos`;
        }
    }

    function aplicarFiltros() {
        const consulta = (buscador ? buscador.value : "").trim().toLowerCase();
        const categoria = filtro ? filtro.value : "";

        let resultados = [...productosBase];

        if (categoria) {
            resultados = resultados.filter((producto) => producto.categoria === categoria);
        }

        if (consulta) {
            resultados = resultados.filter((producto) => {
                const campos = `${producto.nombre} ${producto.categoria} ${producto.material}`;
                return campos.toLowerCase().includes(consulta);
            });
        }

        pintar(resultados, consulta || categoria);
    }

    mostrarCargando(grilla);

    try {
        productosBase = await obtenerProductos();
        await cargarCategorias(filtro);
        if (filtro) {
            filtro.removeAttribute("hidden");
        }
        pintar(productosBase, "");
    } catch (error) {
        console.error("Error al cargar el catálogo:", error);
        mostrarError(grilla);
        return;
    }

    if (buscador) {
        buscador.addEventListener("input", () => {
            clearTimeout(temporizador);

            temporizador = setTimeout(() => {
                aplicarFiltros();
            }, ESPERA_BUSQUEDA);
        });

        const formulario = buscador.closest("form");
        if (formulario) {
            formulario.addEventListener("submit", (evento) => {
                evento.preventDefault();
            });
        }
    }

    if (filtro) {
        filtro.addEventListener("change", aplicarFiltros);
    }
}

document.addEventListener("DOMContentLoaded", iniciarCatalogo);
