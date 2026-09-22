function crearTarjetaProducto(producto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "product-card";

    if (producto.oferta) {
        const badge = document.createElement("span");
        badge.className = "product-badge";
        badge.textContent = "OFERTA";
        tarjeta.appendChild(badge);
    }

    const enlace = document.createElement("a");
    enlace.className = "product-link";
    enlace.href = `producto.html?id=${encodeURIComponent(producto.id)}`;

    const contenedorImagen = document.createElement("div");
    contenedorImagen.className = "product-image";

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.alt;
    contenedorImagen.appendChild(imagen);

    const nombre = document.createElement("h3");
    nombre.className = "product-name";
    nombre.textContent = producto.nombre;

    enlace.append(contenedorImagen, nombre);

    if (producto.precioOriginal) {
        const precioAnterior = document.createElement("p");
        precioAnterior.className = "product-price-original";
        precioAnterior.textContent = formatearPrecio(producto.precioOriginal);
        enlace.appendChild(precioAnterior);
    }

    const precio = document.createElement("p");
    precio.className = "product-price";
    precio.textContent = formatearPrecio(producto.precio);
    enlace.appendChild(precio);

    tarjeta.appendChild(enlace);

        const botonAgregar = document.createElement("button");
    botonAgregar.type = "button";
    botonAgregar.className = "cart-btn-primary";
    botonAgregar.textContent = "Agregar al carrito";
    
    botonAgregar.addEventListener("click", (e) => {
        e.preventDefault();
        agregarAlCarrito(producto.id);
    });

    tarjeta.appendChild(botonAgregar);

    return tarjeta;
}

function renderizarProductos(productos, contenedor) {
    contenedor.replaceChildren();
    productos.forEach((producto) => {
        contenedor.appendChild(crearTarjetaProducto(producto));
    });
}

function mostrarCargando(contenedor) {
    const mensaje = document.createElement("p");
    mensaje.className = "estado-carga";
    mensaje.textContent = "Cargando productos…";
    contenedor.replaceChildren(mensaje);
}

function mostrarSinResultados(contenedor, consulta) {
    const mensaje = document.createElement("p");
    mensaje.className = "estado-vacio";
    mensaje.textContent = `No encontramos muebles que coincidan con "${consulta}". Probá con otra palabra.`;
    contenedor.replaceChildren(mensaje);
}

function mostrarError(contenedor) {
    const mensaje = document.createElement("p");
    mensaje.className = "estado-error";
    mensaje.textContent = "No pudimos cargar los productos. Recargá la página para intentar de nuevo.";
    contenedor.replaceChildren(mensaje);
}
