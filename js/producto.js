function mostrarErrorDetalle(contenedor, mensajeTexto) {
    const mensaje = document.createElement("p");
    mensaje.className = "estado-error";
    mensaje.textContent = mensajeTexto;
    contenedor.replaceChildren(mensaje);
}

async function iniciarDetalle() {
    const contenedor = document.querySelector("#contenedor-detalle");
    const URL = new URLSearchParams(window.location.search);
    const idProducto = URL.get("id");

    if (!idProducto) {
        mostrarErrorDetalle(contenedor, "No se especificación ningún producto.");
        return;
    }

    const producto = await obtenerProductoPorId(idProducto);

    if (!producto) {
        mostrarErrorDetalle(contenedor, "El producto solicitado no existe.");
        return;
    }

    const contenido = document.createDocumentFragment();

    const bloquePrincipal = document.createElement("div");
    bloquePrincipal.className = "detail-main-block";

    const media = document.createElement("div");
    media.className = "detail-media";
    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.alt;
    media.appendChild(imagen);

    const informacion = document.createElement("div");
    informacion.className = "detail-info-box";

    const nombre = document.createElement("h2");
    nombre.textContent = producto.nombre;
    const descripcion = document.createElement("p");
    descripcion.textContent = producto.descripcion;
    const precio = document.createElement("p");
    precio.className = "detail-price";
    precio.textContent = formatearPrecio(producto.precio);
    informacion.append(nombre, descripcion, precio);

    bloquePrincipal.append(media, informacion);

    const especificaciones = document.createElement("div");
    especificaciones.className = "detail-specs-box";
    const tituloEspecificaciones = document.createElement("h3");
    tituloEspecificaciones.textContent = "Especificaciones";

    const grilla = document.createElement("div");
    grilla.className = "detail-specs-grid";
    const datosEspecificaciones = [
        ["Material", producto.material],
        ["Medidas", producto.medidas],
        ["Acabado", producto.acabado],
        ["Stock disponible", `${producto.stock} unidades`]
    ];

    datosEspecificaciones.forEach(([etiqueta, valor]) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "spec-card";
        const nombreDato = document.createElement("span");
        nombreDato.className = "spec-label";
        nombreDato.textContent = etiqueta;
        const valorDato = document.createElement("span");
        valorDato.className = "spec-value";
        valorDato.textContent = valor;
        tarjeta.append(nombreDato, valorDato);
        grilla.appendChild(tarjeta);
    });

    especificaciones.append(tituloEspecificaciones, grilla);

    const acciones = document.createElement("div");
    acciones.className = "detail-action";
    const botonAgregar = document.createElement("button");
    botonAgregar.className = "hero-button";
    botonAgregar.id = "btn-add-to-cart";
    botonAgregar.type = "button";
    botonAgregar.textContent = "Añadir al carrito";
    acciones.appendChild(botonAgregar);

    contenido.append(bloquePrincipal, especificaciones, acciones);
    contenedor.replaceChildren(contenido);

    botonAgregar.addEventListener("click", () => {
        agregarAlCarrito(producto.id);
    });
}

document.addEventListener("DOMContentLoaded", iniciarDetalle);