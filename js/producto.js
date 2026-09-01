async function iniciarDetalle() {
   const contenedor = document.querySelector("#contenedor-detalle");
   const URL = new URLSearchParams(window.location.search);
   const id = URL.get("id");
   console.log("ID:" + id + " del producto");

   const producto = await obtenerProductoPorId(id);
   if(!producto){
        contenedor.innerHTML= `<p class= "estado-error">El producto solicitado no existe. </p>`;
        return;
   }
   console.log("Producto: ", producto);
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
        <button class="hero-button" type="button">Añadir al carrito</button>
    </div>
`;
}
document.addEventListener("DOMContentLoaded", iniciarDetalle);