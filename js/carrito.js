/* ========================================================================
   MÓDULO DE CARRITO DE COMPRAS
   ------------------------------------------------------------------------
   Maneja la lógica del carrito, almacenamiento local y sincronización de UI.
   ======================================================================== */

const CLAVE_LOCAL_STORAGE = "muebleria_carrito";

function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem(CLAVE_LOCAL_STORAGE);
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_LOCAL_STORAGE, JSON.stringify(carrito));
    actualizarContadorHeader();
}

function actualizarContadorHeader() {
    const contadorElem = document.getElementById("cart-count");
    if (!contadorElem) return;

    const carrito = obtenerCarrito();
    const totalUnidades = carrito.reduce((acum, item) => acum + item.cantidad, 0);
    contadorElem.textContent = totalUnidades;
}

function mostrarAvisoFlotante(mensaje) {
    let toast = document.getElementById("cart-toast");
    
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "cart-toast";
        toast.className = "cart-toast";
        document.body.appendChild(toast);
    }

    toast.textContent = mensaje;
    toast.classList.add("visible");

    if (window.toastTimeout) {
        clearTimeout(window.toastTimeout);
    }

    window.toastTimeout = setTimeout(() => {
        toast.classList.remove("visible");
    }, 3000);
}

async function agregarAlCarrito(idProducto) {
    let productos = [];
    
    if (typeof obtenerProductos === "function") {
        productos = await obtenerProductos();
    } else if (window.PRODUCTOS) {
        productos = window.PRODUCTOS;
    }

    const productoEncontrado = productos.find(p => p.id === Number(idProducto));
    if (!productoEncontrado) return;

    const carrito = obtenerCarrito();
    const indice = carrito.findIndex(item => item.id === productoEncontrado.id);

    if (indice !== -1) {
        carrito[indice].cantidad += 1;
    } else {
        carrito.push({
            id: productoEncontrado.id,
            nombre: productoEncontrado.nombre,
            precio: productoEncontrado.precio,
            imagen: productoEncontrado.imagen,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    mostrarAvisoFlotante(`"${productoEncontrado.nombre}" fue agregado al carrito.`);

    if (typeof renderizarPaginaCarrito === "function") {
        renderizarPaginaCarrito();
    }
}

function quitarDelCarrito(idProducto) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.id !== Number(idProducto));
    guardarCarrito(carrito);

    if (typeof renderizarPaginaCarrito === "function") {
        renderizarPaginaCarrito();
    }
}

function cambiarCantidad(idProducto, nuevaCantidad) {
    const cantidad = parseInt(nuevaCantidad, 10);
    if (isNaN(cantidad) || cantidad <= 0) {
        quitarDelCarrito(idProducto);
        return;
    }

    const carrito = obtenerCarrito();
    const item = carrito.find(i => i.id === Number(idProducto));
    
    if (item) {
        item.cantidad = cantidad;
        guardarCarrito(carrito);

        if (typeof renderizarPaginaCarrito === "function") {
            renderizarPaginaCarrito();
        }
    }
}

function vaciarCarrito() {
    guardarCarrito([]);
    
    if (typeof renderizarPaginaCarrito === "function") {
        renderizarPaginaCarrito();
    }
}

function calcularTotal() {
    const carrito = obtenerCarrito();
    return carrito.reduce((acum, item) => acum + (item.precio * item.cantidad), 0);
}

function crearFilaCarrito(item) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "cart-item-card";

    const contenedorImagen = document.createElement("div");
    contenedorImagen.className = "cart-item-img";
    const imagen = document.createElement("img");
    imagen.src = item.imagen;
    imagen.alt = item.nombre;
    contenedorImagen.appendChild(imagen);

    const detalles = document.createElement("div");
    detalles.className = "cart-item-details";
    const nombre = document.createElement("h3");
    nombre.className = "cart-item-title";
    nombre.textContent = item.nombre;
    const precio = document.createElement("p");
    precio.className = "cart-item-price";
    precio.textContent = `$${item.precio.toLocaleString("es-AR")}`;
    detalles.append(nombre, precio);

    const acciones = document.createElement("div");
    acciones.className = "cart-item-actions";
    const controlesCantidad = document.createElement("div");
    controlesCantidad.className = "cart-quantity-controls";

    const botonMenos = document.createElement("button");
    botonMenos.type = "button";
    botonMenos.dataset.action = "decrementar";
    botonMenos.dataset.id = item.id;
    botonMenos.setAttribute("aria-label", "Restar una unidad");
    botonMenos.textContent = "-";

    const entradaCantidad = document.createElement("input");
    entradaCantidad.type = "number";
    entradaCantidad.min = "1";
    entradaCantidad.value = item.cantidad;
    entradaCantidad.dataset.action = "cambiar-cantidad";
    entradaCantidad.dataset.id = item.id;

    const botonMas = document.createElement("button");
    botonMas.type = "button";
    botonMas.dataset.action = "incrementar";
    botonMas.dataset.id = item.id;
    botonMas.setAttribute("aria-label", "Sumar una unidad");
    botonMas.textContent = "+";
    controlesCantidad.append(botonMenos, entradaCantidad, botonMas);

    const subtotal = document.createElement("span");
    subtotal.className = "cart-item-subtotal";
    subtotal.textContent = `$${(item.precio * item.cantidad).toLocaleString("es-AR")}`;

    const botonQuitar = document.createElement("button");
    botonQuitar.type = "button";
    botonQuitar.className = "cart-btn-remove";
    botonQuitar.dataset.action = "quitar";
    botonQuitar.dataset.id = item.id;
    botonQuitar.setAttribute("aria-label", "Eliminar producto");
    botonQuitar.textContent = "×";

    acciones.append(controlesCantidad, subtotal, botonQuitar);
    tarjeta.append(contenedorImagen, detalles, acciones);

    return tarjeta;
}

function renderizarPaginaCarrito() {
    const contenedor = document.getElementById("cart-page-container");
    if (!contenedor) return;

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        const estadoVacio = document.createElement("div");
        estadoVacio.className = "cart-empty-state";
        const titulo = document.createElement("h2");
        titulo.textContent = "Tu carrito está vacío";
        const mensaje = document.createElement("p");
        mensaje.textContent = "Parece que aún no agregaste ningún producto.";
        const enlaceCatalogo = document.createElement("a");
        enlaceCatalogo.href = "productos.html";
        enlaceCatalogo.className = "cart-btn-primary";
        enlaceCatalogo.textContent = "Explorar Catálogo";
        estadoVacio.append(titulo, mensaje, enlaceCatalogo);
        contenedor.replaceChildren(estadoVacio);
        return;
    }

    const subtotalTotal = calcularTotal();
    const layout = document.createElement("div");
    layout.className = "cart-layout";

    const lista = document.createElement("div");
    lista.className = "cart-list";
    carrito.forEach((item) => lista.appendChild(crearFilaCarrito(item)));

    const accionesLista = document.createElement("div");
    accionesLista.className = "cart-list-actions";
    const botonVaciar = document.createElement("button");
    botonVaciar.type = "button";
    botonVaciar.className = "cart-btn-secondary";
    botonVaciar.dataset.action = "vaciar";
    botonVaciar.textContent = "Vaciar Carrito";
    accionesLista.appendChild(botonVaciar);
    lista.appendChild(accionesLista);

    const resumen = document.createElement("div");
    resumen.className = "cart-summary-card";
    const tituloResumen = document.createElement("h3");
    tituloResumen.textContent = "Resumen de Compra";

    const filaSubtotal = document.createElement("div");
    filaSubtotal.className = "cart-summary-row";
    const etiquetaSubtotal = document.createElement("span");
    etiquetaSubtotal.textContent = "Subtotal";
    const valorSubtotal = document.createElement("span");
    valorSubtotal.textContent = `$${subtotalTotal.toLocaleString("es-AR")}`;
    filaSubtotal.append(etiquetaSubtotal, valorSubtotal);

    const filaTotal = document.createElement("div");
    filaTotal.className = "cart-summary-row cart-summary-total";
    const etiquetaTotal = document.createElement("span");
    etiquetaTotal.textContent = "Total";
    const valorTotal = document.createElement("span");
    valorTotal.textContent = `$${subtotalTotal.toLocaleString("es-AR")}`;
    filaTotal.append(etiquetaTotal, valorTotal);

    const botonCheckout = document.createElement("button");
    botonCheckout.type = "button";
    botonCheckout.className = "cart-btn-primary cart-btn-checkout";
    botonCheckout.dataset.action = "finalizar-compra";
    botonCheckout.textContent = "Finalizar Compra";
    resumen.append(tituloResumen, filaSubtotal, filaTotal, botonCheckout);

    layout.append(lista, resumen);
    contenedor.replaceChildren(layout);
}

function configurarEventosCarrito() {
    const contenedor = document.getElementById("cart-page-container");
    if (!contenedor) return;

    contenedor.addEventListener("click", (evento) => {
        const control = evento.target.closest("[data-action]");
        if (!control) return;

        const accion = control.dataset.action;
        const idProducto = control.dataset.id;

        if (accion === "incrementar" || accion === "decrementar") {
            const input = control.closest(".cart-item-card").querySelector("input[data-action='cambiar-cantidad']");
            const cantidadActual = parseInt(input.value, 10) || 1;
            const incremento = accion === "incrementar" ? 1 : -1;
            cambiarCantidad(idProducto, cantidadActual + incremento);
        } else if (accion === "quitar") {
            quitarDelCarrito(idProducto);
        } else if (accion === "vaciar") {
            vaciarCarrito();
        } else if (accion === "finalizar-compra") {
            alert("¡Gracias por tu compra!");
        }
    });

    contenedor.addEventListener("change", (evento) => {
        const control = evento.target.closest("[data-action='cambiar-cantidad']");
        if (!control) return;

        cambiarCantidad(control.dataset.id, control.value);
    });
}

// Inicialización global al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorHeader();
    configurarEventosCarrito();
    renderizarPaginaCarrito();
});