document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (!navToggle || !navMenu) {
        return;
    }

    const cerrarMenu = () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
        const estaAbierto = navMenu.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(estaAbierto));
    });

    navMenu.querySelectorAll("a").forEach((enlace) => {
        enlace.addEventListener("click", cerrarMenu);
    });

    document.addEventListener("click", (event) => {
        const clicDentroDelMenu = event.target.closest(".nav-menu");
        const clicEnBoton = event.target.closest(".nav-toggle");

        if (!clicDentroDelMenu && !clicEnBoton && navMenu.classList.contains("is-open")) {
            cerrarMenu();
        }
    });
});
