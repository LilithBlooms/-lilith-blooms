/* ======================
UTILIDAD SEGURA
====================== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* ======================
CARRITO
====================== */
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carritoBtn = $("#carrito");
const carritoLateral = $("#carritoLateral");
const cerrarCarrito = $("#cerrarCarrito");
const overlay = $("#overlay");
const carritoItems = $(".carrito-items");
const carritoTotal = $(".carrito-total h3");
const contadorCarrito = $("#carrito span");

function abrirCarrito() {
    carritoLateral?.classList.add("active");
    overlay?.classList.add("active");
}

function cerrar() {
    carritoLateral?.classList.remove("active");
    overlay?.classList.remove("active");
}

carritoBtn?.addEventListener("click", abrirCarrito);
cerrarCarrito?.addEventListener("click", cerrar);
overlay?.addEventListener("click", cerrar);

/* ======================
AGREGAR AL CARRITO
====================== */
$$(".producto button").forEach(btn => {
    btn.addEventListener("click", () => {

        const producto = btn.closest(".producto");
        if (!producto) return;

        const nombre = producto.querySelector("h3")?.innerText || "Producto";
        const precio = Number(producto.querySelector("p")?.innerText.replace("RD$", "").replace(",", "")) || 0;
        const imagen = producto.querySelector("img")?.src || "";

        carrito.push({
            nombre,
            precio,
            imagen,
            cantidad: 1
        });

        actualizarCarrito();
    });
});

/* ======================
ACTUALIZAR CARRITO
====================== */
function actualizarCarrito() {

    if (!carritoItems || !carritoTotal || !contadorCarrito) return;

    carritoItems.innerHTML = "";

    let total = 0;

    carrito.forEach((item, i) => {

        total += item.precio * item.cantidad;

        carritoItems.innerHTML += `
        <div style="display:flex;gap:10px;align-items:center;margin:10px 0;">
            <img src="${item.imagen}" style="width:60px;height:60px;object-fit:cover;border-radius:10px;">
            <div style="flex:1;">
                <strong>${item.nombre}</strong>
                <p>RD$${item.precio}</p>

                <div>
                    <button onclick="restar(${i})">-</button>
                    <span>${item.cantidad}</span>
                    <button onclick="sumar(${i})">+</button>
                </div>
            </div>

            <button onclick="eliminar(${i})">🗑️</button>
        </div>
        `;
    });

    carritoTotal.innerText = "Total: RD$" + total.toLocaleString();
    contadorCarrito.innerText = carrito.length;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

window.eliminar = (i) => {
    carrito.splice(i, 1);
    actualizarCarrito();
};

window.sumar = (i) => {
    carrito[i].cantidad++;
    actualizarCarrito();
};

window.restar = (i) => {
    carrito[i].cantidad--;
    if (carrito[i].cantidad <= 0) carrito.splice(i, 1);
    actualizarCarrito();
};

/* ======================
WHATSAPP (CARRITO)
====================== */
$(".carrito-total button")?.addEventListener("click", () => {

    let mensaje = "Hola 👋 quiero este pedido:%0A%0A";

    carrito.forEach(item => {
        mensaje += `- ${item.nombre} (RD$${item.precio}) x${item.cantidad}%0A`;
    });

    const url = "https://wa.me/18296926964?text=" + encodeURIComponent(mensaje);
    window.open(url, "_blank");
});

/* ======================
FAVORITOS
====================== */
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
const favBtn = $("#favoritos span");

function actualizarFavoritos() {
    if (favBtn) favBtn.innerText = favoritos.length;
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

$$(".favorito-btn").forEach(btn => {
    btn.addEventListener("click", () => {

        const producto = btn.closest(".producto");
        if (!producto) return;

        const nombre = producto.querySelector("h3")?.innerText;

        if (!nombre) return;

        if (favoritos.includes(nombre)) {
            favoritos = favoritos.filter(f => f !== nombre);
            btn.classList.remove("activo");
            btn.innerHTML = "🤍";
        } else {
            favoritos.push(nombre);
            btn.classList.add("activo");
            btn.innerHTML = "❤️";
        }

        actualizarFavoritos();
    });
});

actualizarFavoritos();

/* ======================
FORM PERSONALIZAR (WHATSAPP)
====================== */
$("#formPersonalizar")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = this.querySelectorAll("select, input, textarea");

    let mensaje = "Hola 👋 quiero un ramo personalizado:%0A%0A";

    mensaje += `Flor: ${data[0].value}%0A`;
    mensaje += `Color: ${data[1].value}%0A`;
    mensaje += `Cantidad: ${data[2].value}%0A`;
    mensaje += `Papel: ${data[3].value}%0A`;
    mensaje += `Moño: ${data[4].value}%0A`;

    if (data[5].value) {
        mensaje += `Mensaje: ${data[5].value}%0A`;
    }

    const url = "https://wa.me/18296926964?text=" + encodeURIComponent(mensaje);
    window.open(url, "_blank");
});

/* ======================
LILITH AI (CHAT)
====================== */
const abrirChat = $("#abrirChat");
const cerrarChat = $("#cerrarChat");
const chatBox = $("#chatBox");
const chatMensajes = $("#chatMensajes");
const input = $("#mensajeUsuario");
const enviar = $("#enviarMensaje");

function bot(texto) {

    texto = texto.toLowerCase();

    if (texto.includes("envio")) return "🚚 Sí hacemos envíos en Santo Domingo.";
    if (texto.includes("precio")) return "💐 Tenemos ramos desde RD$900 en adelante.";
    if (texto.includes("personal")) return "🎀 Sí, puedes personalizar tu ramo completamente.";
    if (texto.includes("hola")) return "🌸 ¡Hola! Soy Lilith AI, ¿en qué te ayudo?";

    return "💐 Escríbenos por WhatsApp al +1 (829) 692-6964 para ayudarte mejor.";
}

function addMsg(text, cls) {
    if (!chatMensajes) return;

    chatMensajes.innerHTML += `<div class="${cls}">${text}</div>`;
    chatMensajes.scrollTop = chatMensajes.scrollHeight;
}

abrirChat?.addEventListener("click", () => chatBox?.classList.add("active"));
cerrarChat?.addEventListener("click", () => chatBox?.classList.remove("active"));

function enviarMsg() {
    if (!input) return;

    const texto = input.value.trim();
    if (!texto) return;

    addMsg(texto, "usuario");
    addMsg(bot(texto), "bot");

    input.value = "";
}

enviar?.addEventListener("click", enviarMsg);
input?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") enviarMsg();
});

/* ======================
INICIALIZAR
====================== */
actualizarCarrito();

console.log("Lilith Blooms PRO cargado 💐");
