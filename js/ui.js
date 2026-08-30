/* ========================================================================
   FUNCIONES DE INTERFAZ COMPARTIDAS
   ------------------------------------------------------------------------
   Todo lo que dibuja tarjetas de producto vive acá, porque lo usan tanto
   el carrusel del inicio (main.js) como la grilla del catálogo
   (catalogo.js). Cargar este archivo después de productos.js.
   ======================================================================== */

/* Construye el HTML de una tarjeta de producto.
   Sin loading="lazy" en la imagen: el carrusel se desplaza con transform y
   el navegador no considera visibles las tarjetas corridas, así que las
   imágenes diferidas nunca llegarían a cargarse. */
function crearTarjetaProducto(producto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "product-card";

    const badge = producto.oferta
        ? '<span class="product-badge">OFERTA</span>'
        : "";

    const precioAnterior = producto.precioOriginal
        ? `<p class="product-price-original">${formatearPrecio(producto.precioOriginal)}</p>`
        : "";

    tarjeta.innerHTML = `
        ${badge}
        <a class="product-link" href="producto.html?id=${producto.id}">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.alt}">
            </div>
            <h3 class="product-name">${producto.nombre}</h3>
            ${precioAnterior}
            <p class="product-price">${formatearPrecio(producto.precio)}</p>
        </a>
    `;

    return tarjeta;
}

/* Vuelca las tarjetas dentro del contenedor indicado */
function renderizarProductos(productos, contenedor) {
    contenedor.innerHTML = "";
    productos.forEach((producto) => {
        contenedor.appendChild(crearTarjetaProducto(producto));
    });
}

/* Mensaje mientras se resuelve la petición simulada */
function mostrarCargando(contenedor) {
    contenedor.innerHTML = '<p class="estado-carga">Cargando productos…</p>';
}

/* Mensaje cuando la búsqueda no devuelve nada */
function mostrarSinResultados(contenedor, consulta) {
    contenedor.innerHTML =
        `<p class="estado-vacio">No encontramos muebles que coincidan con "${consulta}". Probá con otra palabra.</p>`;
}

/* Mensaje si la carga falla */
function mostrarError(contenedor) {
    contenedor.innerHTML =
        '<p class="estado-error">No pudimos cargar los productos. Recargá la página para intentar de nuevo.</p>';
}
