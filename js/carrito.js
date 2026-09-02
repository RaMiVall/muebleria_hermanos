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

function renderizarPaginaCarrito() {
    const contenedor = document.getElementById("cart-page-container");
    if (!contenedor) return;

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="cart-empty-state">
                <h2>Tu carrito está vacío</h2>
                <p>Parece que aún no agregaste ningún producto.</p>
                <a href="productos.html" class="cart-btn-primary">Explorar Catálogo</a>
            </div>
        `;
        return;
    }

    const subtotalTotal = calcularTotal();

    let HTMLFilas = carrito.map(item => {
        const subtotalItem = item.precio * item.cantidad;
        return `
            <div class="cart-item-card">
                <div class="cart-item-img">
                    <img src="${item.imagen}" alt="${item.nombre}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.nombre}</h3>
                    <p class="cart-item-price">$${item.precio.toLocaleString('es-AR')}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-quantity-controls">
                        <button type="button" onclick="cambiarCantidad(${item.id}, ${item.cantidad - 1})" aria-label="Restar una unidad">-</button>
                        <input type="number" min="1" value="${item.cantidad}" onchange="cambiarCantidad(${item.id}, this.value)">
                        <button type="button" onclick="cambiarCantidad(${item.id}, ${item.cantidad + 1})" aria-label="Sumar una unidad">+</button>
                    </div>
                    <span class="cart-item-subtotal">$${subtotalItem.toLocaleString('es-AR')}</span>
                    <button type="button" class="cart-btn-remove" onclick="quitarDelCarrito(${item.id})" aria-label="Eliminar producto">&times;</button>
                </div>
            </div>
        `;
    }).join("");

    contenedor.innerHTML = `
        <div class="cart-layout">
            <div class="cart-list">
                ${HTMLFilas}
                <div class="cart-list-actions">
                    <button type="button" class="cart-btn-secondary" onclick="vaciarCarrito()">Vaciar Carrito</button>
                </div>
            </div>
            <div class="cart-summary-card">
                <h3>Resumen de Compra</h3>
                <div class="cart-summary-row">
                    <span>Subtotal</span>
                    <span>$${subtotalTotal.toLocaleString('es-AR')}</span>
                </div>
                <div class="cart-summary-row cart-summary-total">
                    <span>Total</span>
                    <span>$${subtotalTotal.toLocaleString('es-AR')}</span>
                </div>
                <button type="button" class="cart-btn-primary cart-btn-checkout" onclick="alert('¡Gracias por tu compra!')">Finalizar Compra</button>
            </div>
        </div>
    `;
}

// Inicialización global al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorHeader();
    renderizarPaginaCarrito();
});