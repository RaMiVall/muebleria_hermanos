async function iniciarDetalle() {
    const contenedor = document.querySelector("#contenedor-detalle");
    const URL = new URLSearchParams(window.location.search);
    const idProducto = URL.get("id");

    if (!idProducto) {
        contenedor.innerHTML = `<p class="estado-error">No se especificación ningún producto.</p>`;
        return;
    }

    const producto = await obtenerProductoPorId(idProducto);

    if (!producto) {
        contenedor.innerHTML = `<p class="estado-error">El producto solicitado no existe.</p>`;
        return;
    }

    contenedor.innerHTML = `
        <div class="detail-main-block">
            <div class="detail-media">
                <img src="${producto.imagen}" alt="${producto.alt}">
            </div>
            <div class="detail-info-box">
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <p class="detail-price">${formatearPrecio(producto.precio)}</p>
            </div>
        </div>

        <div class="detail-specs-box">
            <h3>Especificaciones</h3>
            <div class="detail-specs-grid">
                <div class="spec-card">
                    <span class="spec-label">Material</span>
                    <span class="spec-value">${producto.material}</span>
                </div>
                <div class="spec-card">
                    <span class="spec-label">Medidas</span>
                    <span class="spec-value">${producto.medidas}</span>
                </div>
                <div class="spec-card">
                    <span class="spec-label">Acabado</span>
                    <span class="spec-value">${producto.acabado}</span>
                </div>
                <div class="spec-card">
                    <span class="spec-label">Stock disponible</span>
                    <span class="spec-value">${producto.stock} unidades</span>
                </div>
            </div>
        </div>

        <div class="detail-action">
            <button class="hero-button" id="btn-add-to-cart" type="button">Añadir al carrito</button>
        </div>
    `;

    const botonDetalle = document.getElementById("btn-add-to-cart");

    if (botonDetalle) {
        botonDetalle.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });
    }
}

document.addEventListener("DOMContentLoaded", iniciarDetalle);