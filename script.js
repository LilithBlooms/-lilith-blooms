/*======================
LILITH BLOOMS CLEAN JS
======================*/

const carritoBtn = document.getElementById("carrito");
const favoritosBtn = document.getElementById("favoritos");

const carritoLateral = document.getElementById("carritoLateral");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const overlay = document.getElementById("overlay");

const carritoItems = document.querySelector(".carrito-items");
const carritoTotal = document.querySelector(".carrito-total h3");

const contadorCarrito = document.querySelector("#carrito span");
const contadorFavoritos = document.querySelector("#favoritos span");

let carrito = [];
let favoritos = [];

/*======================
INIT
======================*/

document.addEventListener("DOMContentLoaded", () => {

    activarProductos();
    activarUI();
    activarFavoritos();
    activarFAQ();
    activarChat();
});

/*======================
UI
======================*/

function activarUI() {

    carritoBtn.onclick = () => {
        carritoLateral.classList.add("active");
        overlay.classList.add("active");
    };

    cerrarCarrito.onclick = cerrarCarritoFn;
    overlay.onclick = cerrarCarritoFn;

    document.getElementById("modoOscuro").onclick = () => {
        document.body.classList.toggle("dark");
    };
}

function cerrarCarritoFn() {
    carritoLateral.classList.remove("active");
    overlay.classList.remove("active");
}

/*======================
PRODUCTOS
======================*/

function activarProductos() {

    document.querySelectorAll(".producto button").forEach(btn => {

        btn.addEventListener("click", () => {

            const p = btn.closest(".producto");

            const nombre = p.querySelector("h3").innerText;
            const precio = parseInt(p.querySelector("p").innerText.replace("RD$", "").replace(",", ""));
            const imagen = p.querySelector("img").src;

            const existe = carrito.find(i => i.nombre === nombre);

            if (existe) {
                existe.cantidad++;
            } else {
                carrito.push({ nombre, precio, imagen, cantidad: 1 });
            }

            renderCarrito();
            toast("Agregado al carrito 🌸");

        });

    });
}

function renderCarrito() {

    carritoItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (carrito.length === 0) {
        carritoItems.innerHTML = "<p>Tu carrito está vacío</p>";
        carritoTotal.innerText = "Total: RD$0";
        contadorCarrito.innerText = "0";
        return;
    }

    carrito.forEach((p, i) => {

        total += p.precio * p.cantidad;
        count += p.cantidad;

        const div = document.createElement("div");

        div.innerHTML = `
            <img src="${p.imagen}" width="50" style="border-radius:10px">
            <div style="flex:1">
                <strong>${p.nombre}</strong>
                <p>RD$${p.precio}</p>
                <small>Cant: ${p.cantidad}</small>
            </div>
        `;

        carritoItems.appendChild(div);
    });

    carritoTotal.innerText = `Total: RD$${total}`;
    contadorCarrito.innerText = count;
}

/*======================
FAVORITOS
======================*/

function activarFavoritos() {

    document.querySelectorAll(".producto").forEach(p => {

        const btn = document.createElement("button");
        btn.classList.add("btn-favorito");
        btn.innerHTML = "❤";
        p.appendChild(btn);

        const nombre = p.querySelector("h3").innerText;

        btn.onclick = () => {

            if (favoritos.includes(nombre)) {
                favoritos = favoritos.filter(f => f !== nombre);
                btn.classList.remove("activo");
            } else {
                favoritos.push(nombre);
                btn.classList.add("activo");
            }

            contadorFavoritos.innerText = favoritos.length;
        };
    });
}

/*======================
FAQ
======================*/

function activarFAQ() {

    document.querySelectorAll(".faq-item button").forEach(btn => {
        btn.onclick = () => {
            const div = btn.nextElementSibling;
            div.style.display = div.style.display === "block" ? "none" : "block";
        };
    });
}

/*======================
TOAST
======================*/

function toast(text) {

    const div = document.createElement("div");
    div.className = "toast";
    div.innerText = text;

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 2000);
}

/*======================
CHAT IA (CLEAN)
======================*/

function activarChat() {

    const chat = document.getElementById("ia-chat");
    const open = document.getElementById("ia-boton");
    const close = document.getElementById("ia-close");
    const send = document.getElementById("ia-enviar");
    const input = document.getElementById("ia-texto");
    const box = document.getElementById("ia-mensajes");

    open.onclick = () => {
        chat.style.display = "flex";
    };

    close.onclick = () => {
        chat.style.display = "none";
    };

    send.onclick = enviar;

    function enviar() {

        const msg = input.value.trim();
        if (!msg) return;

        box.innerHTML += `<div class="user">Tú: ${msg}</div>`;
        input.value = "";

        setTimeout(() => {
            box.innerHTML += `<div class="bot">🌸 Te ayudo con eso</div>`;
            box.scrollTop = box.scrollHeight;
        }, 400);
    }
}
