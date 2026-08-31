/* ========================================================================
    CATÁLOGO DE PRODUCTOS — Mueblería Hermanos Jota
    ------------------------------------------------------------------------
    No modificar los nombres de las propiedades sin avisar: index, catálogo 
    y detalle.

        id             number   identificador único (se usa en producto.html?id=)
        nombre         string   nombre comercial
        categoria      string   familia del mueble
        precio         number   precio vigente en pesos (sin formatear)
        precioOriginal number   precio anterior. null si no está en oferta
        oferta         boolean  true => se muestra el badge "OFERTA"
        destacado      boolean  true => aparece en el carrusel del index
        imagen         string   ruta relativa a la imagen
        alt            string   texto alternativo de la imagen
        descripcion    string   descripción larga para producto.html
        material       string   materiales de fabricación
        medidas        string   alto x ancho x profundidad
        acabado        string   terminación superficial
        stock          number   unidades disponibles
   ======================================================================== */

const PRODUCTOS = [
    {
        id: 1,
        nombre: "Sofá Patagonia",
        categoria: "Living",
        precio: 899999.99,
        precioOriginal: 1099999.99,
        oferta: true,
        destacado: true,
        imagen: "./assets/img/Sofá Patagonia.png",
        alt: "Sofá de tres cuerpos tapizado en lino natural",
        descripcion: "Un sofá de tres cuerpos que invita a quedarse. Su estructura de lenga maciza y el tapizado en lino de fibra larga lo vuelven tan resistente como cómodo. Los almohadones de asiento son reversibles y desenfundables, pensados para acompañar la vida real de una casa.",
        material: "Madera de lenga maciza certificada FSC, tapizado de lino natural",
        medidas: "85 cm alto x 220 cm ancho x 95 cm profundidad",
        acabado: "Aceite vegetal penetrante, sin barnices sintéticos",
        stock: 6
    },
    {
        id: 2,
        nombre: "Sillón Copacabana",
        categoria: "Living",
        precio: 429999.99,
        precioOriginal: null,
        oferta: false,
        destacado: true,
        imagen: "./assets/img/Sillón Copacabana.png",
        alt: "Sillón individual de líneas curvas con patas de madera",
        descripcion: "Homenaje al diseño brasileño de los años sesenta. Las curvas del respaldo se trabajan con madera laminada al vapor, una técnica artesanal que lleva tres días por pieza. El resultado es un sillón que abraza sin apretar.",
        material: "Madera de guatambú laminada, tapizado de bouclé",
        medidas: "78 cm alto x 82 cm ancho x 80 cm profundidad",
        acabado: "Laca al agua mate",
        stock: 9
    },
    {
        id: 3,
        nombre: "Butaca Mendoza",
        categoria: "Living",
        precio: 314999.99,
        precioOriginal: 379999.99,
        oferta: true,
        destacado: true,
        imagen: "./assets/img/Butaca Mendoza.png",
        alt: "Butaca baja con respaldo de listones de madera",
        descripcion: "Inspirada en las galerías de las bodegas cuyanas. El respaldo de listones separados deja pasar el aire y aliviana visualmente la pieza, ideal para espacios chicos donde un sillón macizo pesaría demasiado.",
        material: "Madera de nogal criollo, cinchas de algodón",
        medidas: "72 cm alto x 68 cm ancho x 74 cm profundidad",
        acabado: "Cera de abeja pulida a mano",
        stock: 12
    },
    {
        id: 4,
        nombre: "Mesa Comedor Pampa",
        categoria: "Comedor",
        precio: 749999.99,
        precioOriginal: null,
        oferta: false,
        destacado: true,
        imagen: "./assets/img/Mesa Comedor Pampa.png",
        alt: "Mesa de comedor rectangular de madera maciza para seis personas",
        descripcion: "Una tabla única de algarrobo de más de dos metros, con la veta a la vista y los bordes respetando la forma original del árbol. Cada mesa es irrepetible porque ninguna tabla lo es. Entra cómoda para seis personas y aprieta para ocho.",
        material: "Tablón macizo de algarrobo, patas de hierro pintado",
        medidas: "76 cm alto x 220 cm ancho x 95 cm profundidad",
        acabado: "Aceite de tung con resina natural",
        stock: 4
    },
    {
        id: 5,
        nombre: "Sillas Córdoba",
        categoria: "Comedor",
        precio: 259999.99,
        precioOriginal: 299999.99,
        oferta: true,
        destacado: true,
        imagen: "./assets/img/Sillas Córdoba.png",
        alt: "Juego de dos sillas de comedor con asiento de fibra trenzada",
        descripcion: "Se venden por par. El asiento se teje a mano en fibra de totora siguiendo un patrón serrano tradicional, un trabajo de seis horas por silla. Livianas de levantar, firmes de sentar.",
        material: "Madera de petiribí, asiento de totora trenzada",
        medidas: "88 cm alto x 45 cm ancho x 50 cm profundidad (cada una)",
        acabado: "Laca al agua satinada",
        stock: 15
    },
    {
        id: 6,
        nombre: "Aparador Uspallata",
        categoria: "Comedor",
        precio: 689999.99,
        precioOriginal: null,
        oferta: false,
        destacado: true,
        imagen: "./assets/img/Aparador Uspallata.png",
        alt: "Aparador bajo de cuatro puertas con frentes ranurados",
        descripcion: "Cuatro puertas con frentes ranurados a mano, cepillo por cepillo. Adentro, estantes regulables y un cajón forrado en fieltro para los cubiertos. Las bisagras son de bronce macizo y se ajustan con un destornillador común.",
        material: "Madera de paraíso, tiradores de bronce macizo",
        medidas: "80 cm alto x 180 cm ancho x 45 cm profundidad",
        acabado: "Aceite vegetal penetrante",
        stock: 5
    },
    {
        id: 7,
        nombre: "Mesa de Centro Araucaria",
        categoria: "Living",
        precio: 289999.99,
        precioOriginal: null,
        oferta: false,
        destacado: true,
        imagen: "./assets/img/Mesa de Centro Araucaria.png",
        alt: "Mesa ratona redonda de madera clara con estante inferior",
        descripcion: "Redonda a propósito: sin esquinas, circula mejor en livings chicos y es más segura si hay chicos en casa. El estante inferior resuelve el desorden de revistas y controles remotos sin agregar un mueble más.",
        material: "Madera de araucaria, herrajes de acero inoxidable",
        medidas: "42 cm alto x 90 cm diámetro",
        acabado: "Cera de abeja pulida a mano",
        stock: 11
    },
    {
        id: 8,
        nombre: "Mesa de Noche Aconcagua",
        categoria: "Dormitorio",
        precio: 179999.99,
        precioOriginal: 219999.99,
        oferta: true,
        destacado: true,
        imagen: "./assets/img/Mesa de Noche Aconcagua.png",
        alt: "Mesa de luz de dos cajones con patas cónicas",
        descripcion: "Dos cajones con guías de madera sobre madera, sin metal: se abren en silencio y no se oxidan con la humedad. Las patas cónicas levantan el mueble del piso y hacen que la habitación respire.",
        material: "Madera de cedro misionero",
        medidas: "55 cm alto x 45 cm ancho x 40 cm profundidad",
        acabado: "Laca al agua mate",
        stock: 18
    },
    {
        id: 9,
        nombre: "Biblioteca Recoleta",
        categoria: "Estudio",
        precio: 619999.99,
        precioOriginal: 799999.99,
        oferta: true,
        destacado: true,
        imagen: "./assets/img/Biblioteca Recoleta.png",
        alt: "Biblioteca alta de cinco estantes en madera maciza",
        descripcion: "Cinco estantes que aguantan lo que les pongas: cada uno soporta cuarenta kilos sin curvarse, gracias a un travesaño posterior oculto. Se ancla a la pared con dos tarugos incluidos en la entrega.",
        material: "Madera de guatambú maciza, refuerzos de acero",
        medidas: "200 cm alto x 90 cm ancho x 35 cm profundidad",
        acabado: "Aceite de tung con resina natural",
        stock: 7
    },
    {
        id: 10,
        nombre: "Escritorio Costa",
        categoria: "Estudio",
        precio: 469999.99,
        precioOriginal: null,
        oferta: false,
        destacado: false,
        imagen: "./assets/img/Escritorio Costa.png",
        alt: "Escritorio de trabajo con cajonera lateral y pasacables",
        descripcion: "Pensado para trabajar de verdad. Tiene un pasacables integrado en la tapa, una bandeja oculta bajo el tablero para la notebook y una cajonera lateral que se puede montar a izquierda o derecha según tu espacio.",
        material: "Madera de paraíso, estructura de hierro pintado",
        medidas: "75 cm alto x 140 cm ancho x 65 cm profundidad",
        acabado: "Laca al agua satinada",
        stock: 8
    },
    {
        id: 11,
        nombre: "Silla de Trabajo Belgrano",
        categoria: "Estudio",
        precio: 209999.99,
        precioOriginal: null,
        oferta: false,
        destacado: false,
        imagen: "./assets/img/Silla de Trabajo Belgrano.png",
        alt: "Silla de escritorio de madera con respaldo curvo tapizado",
        descripcion: "El respaldo curvo se moldea al vapor para acompañar la curva lumbar, así que se puede pasar la tarde sentado sin quejarse. El asiento tapizado se desenfunda con cierre para lavarlo.",
        material: "Madera de guatambú laminada, tapizado de lino",
        medidas: "92 cm alto x 48 cm ancho x 52 cm profundidad",
        acabado: "Cera de abeja pulida a mano",
        stock: 14
    }
];

/* ------------------------------------------------------------------------
    API DE ACCESO A LOS DATOS para simular un backend: 
    todas las funciones son asíncronas y tardan un rato,
    igual que una petición de red real.
   ------------------------------------------------------------------------ */

/* Demora para que se note el estado de carga */
const DEMORA_SIMULADA = 500;

/* Devuelve una promesa que resuelve con una copia del catálogo completo */
function obtenerProductos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...PRODUCTOS]);
        }, DEMORA_SIMULADA);
    });
}

/* Devuelve sólo los productos marcados como destacados */
async function obtenerDestacados() {
    const productos = await obtenerProductos();
    return productos.filter((producto) => producto.destacado);
}

/* Busca un producto por su id. Devuelve undefined si no existe */
async function obtenerProductoPorId(id) {
    const productos = await obtenerProductos();
    return productos.find((producto) => producto.id === Number(id));
}

/* Filtra por nombre, categoría o material. Texto vacío => catálogo completo */
async function buscarProductos(texto) {
    const productos = await obtenerProductos();
    const consulta = texto.trim().toLowerCase();

    if (consulta === "") {
        return productos;
    }

    return productos.filter((producto) => {
        const campos = `${producto.nombre} ${producto.categoria} ${producto.material}`;
        return campos.toLowerCase().includes(consulta);
    });
}

async function filtrarPorCategoria(categoria) {
    const productos = await obtenerProductos();
    return productos.filter((producto) => producto.categoria === categoria);
}

async function obtenerCategorias(){
    const productos = await obtenerProductos();
    return [...new Set(productos.map(producto => producto.categoria))];
}


/* Formatea un número como precio argentino: 899999.99 => "$ 899.999,99" */
function formatearPrecio(precio) {
    return "$ " + precio.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
