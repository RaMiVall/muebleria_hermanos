/* ========================================================================
   PÁGINA DE CONTACTO — contacto.html
   Valida el formulario en el cliente y muestra el estado de éxito
   sin salir de la tarjeta.
   ======================================================================== */

const MENSAJES = {
    vacio: "Este campo es obligatorio",
    email: "Por favor ingresar un correo electrónico válido",
    telefono: "Por favor ingresar un teléfono válido",
};

function campoVacio(elemento) {
    return elemento.value.trim() === "";
}

function emailValido(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

function telefonoValido(valor) {
    if (!/^[\d\s+\-()]+$/.test(valor)) {
        return false;
    }

    const digitos = valor.replace(/\D/g, "");
    return digitos.length >= 8 && digitos.length <= 15;
}

function marcarError(grupo, mensaje) {
    const error = grupo.querySelector(".form-error");
    const control = grupo.querySelector("input, select, textarea");

    grupo.classList.add("is-invalid");
    if (error) {
        error.textContent = mensaje;
    }
    if (control) {
        control.setAttribute("aria-invalid", "true");
    }
}

function limpiarError(grupo) {
    const error = grupo.querySelector(".form-error");
    const control = grupo.querySelector("input, select, textarea");

    grupo.classList.remove("is-invalid");
    if (error) {
        error.textContent = "";
    }
    if (control) {
        control.removeAttribute("aria-invalid");
    }
}

function validarCampo(control) {
    const grupo = control.closest(".form-group");

    if (!grupo) {
        return true;
    }

    limpiarError(grupo);

    if (campoVacio(control)) {
        if (!control.required) {
            return true;
        }

        marcarError(grupo, MENSAJES.vacio);
        return false;
    }

    if (control.type === "email" && !emailValido(control.value.trim())) {
        marcarError(grupo, MENSAJES.email);
        return false;
    }

    if (control.type === "tel" && !telefonoValido(control.value.trim())) {
        marcarError(grupo, MENSAJES.telefono);
        return false;
    }

    return true;
}

function mostrarExito(tarjeta, formulario) {
    formulario.hidden = true;
    tarjeta.classList.add("is-success");

    const exito = document.getElementById("contact-success");
    if (exito) {
        exito.hidden = false;
    }
}

function iniciarContacto() {
    const formulario = document.querySelector(".contact-form");
    const tarjeta = document.querySelector(".contact-form-card");
    const nota = document.getElementById("form-note");

    if (!formulario || !tarjeta) {
        return;
    }

    const controles = formulario.querySelectorAll("input, select, textarea");

    controles.forEach((control) => {
        control.addEventListener("input", () => {
            validarCampo(control);

            const hayObligatoriosInvalidos = formulario.querySelector(".form-group.is-invalid [required]");
            if (nota) {
                nota.classList.toggle("is-visible", Boolean(hayObligatoriosInvalidos));
            }
        });
    });

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        let valido = true;
        controles.forEach((control) => {
            if (!validarCampo(control)) {
                valido = false;
            }
        });

        if (nota) {
            const hayObligatoriosInvalidos = formulario.querySelector(".form-group.is-invalid [required]");
            nota.classList.toggle("is-visible", Boolean(hayObligatoriosInvalidos));
        }

        if (!valido) {
            const primero = formulario.querySelector(".form-group.is-invalid input, .form-group.is-invalid select, .form-group.is-invalid textarea");
            if (primero) {
                primero.focus();
            }
            return;
        }

        mostrarExito(tarjeta, formulario);
    });
}

document.addEventListener("DOMContentLoaded", iniciarContacto);
