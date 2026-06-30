/* ======================
CARRO GLOBAL
====================== */

let carrito = [];

const carritoBtn = document.getElementById("carrito");
const carritoLateral = document.getElementById("carritoLateral");
const overlay = document.getElementById("overlay");
const carritoItems = document.querySelector(".carrito-items");
const totalText = document.getElementById("total");
const contador = carritoBtn?.querySelector("span");

/* ======================
ABRIR / CERRAR CARRITO
====================== */

if (carritoBtn && carritoLateral && overlay) {
    carritoBtn.addEventListener("click", () => {
        carritoLateral.classList.add("active");
        overlay.classList.add("active");
    });

    overlay.addEventListener("click", () => {
        carritoLateral.classList.remove("active");
        overlay.classList.remove("active");
    });
}

/* ======================
AGREGAR PRODUCTOS
====================== */

document.querySelectorAll(".btn-agregar").forEach(btn => {
    btn.addEventListener("click", (e) => {

        const producto = e.target.closest(".producto");
        if (!producto) return;

        const nombre = producto.querySelector("h3")?.innerText || "Producto";
        const precio = parseFloat(producto.querySelector("p")?.innerText) || 0;
        const imagen = producto.querySelector("img")?.src || "";

        carrito.push({
            nombre,
            precio,
            imagen,
            cantidad: 1
        });

        renderCarrito();
    });
});

/* ======================
RENDER CARRITO
====================== */

function renderCarrito() {

    if (!carritoItems) return;

    carritoItems.innerHTML = "";

    let total = 0;

    carrito.forEach((item, i) => {

        total += item.precio * item.cantidad;

        carritoItems.innerHTML += `
        <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px;">
            <img src="${item.imagen}" style="width:50px;height:50px;border-radius:10px;object-fit:cover;">
            <div style="flex:1;">
                <strong>${item.nombre}</strong>
                <p>RD$${item.precio}</p>

                <div>
                    <button onclick="restar(${i})">-</button>
                    <span>${item.cantidad}</span>
                    <button onclick="sumar(${i})">+</button>
                </div>
            </div>

            <button onclick="eliminar(${i})">🗑</button>
        </div>
        `;
    });

    if (totalText) {
        totalText.innerText = "Total: RD$" + total.toLocaleString();
    }

    if (contador) {
        contador.innerText = carrito.length;
    }
}

/* ======================
FUNCIONES CARRITO
====================== */

window.eliminar = function(i){
    carrito.splice(i,1);
    renderCarrito();
};

window.sumar = function(i){
    carrito[i].cantidad++;
    renderCarrito();
};

window.restar = function(i){
    carrito[i].cantidad--;
    if (carrito[i].cantidad <= 0) carrito.splice(i,1);
    renderCarrito();
};

/* ======================
WHATSAPP PERSONALIZADO
====================== */

document.getElementById("formPersonalizar")?.addEventListener("submit", function(e){
    e.preventDefault();

    const data = new FormData(this);
    const values = [...this.querySelectorAll("select, input, textarea")];

    let mensaje = `Hola 👋 quiero un ramo personalizado:%0A`;

    values.forEach(el => {
        if (el.type !== "submit") {
            mensaje += `${el.name || "Dato"}: ${el.value}%0A`;
        }
    });

    window.open("https://wa.me/18296926964?text=" + mensaje, "_blank");
});

/* ======================
MÚSICA
====================== */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let playing = false;

musicBtn?.addEventListener("click", () => {

    if (!music) return;

    if (!playing) {
        music.play();
        musicBtn.innerText = "⏸ Pausar música";
        playing = true;
    } else {
        music.pause();
        musicBtn.innerText = "🎵 Música";
        playing = false;
    }
});

/* ======================
CHAT IA SIMPLE
====================== */

const abrirChat = document.getElementById("abrirChat");
const chatBox = document.getElementById("chatBox");
const cerrarChat = document.getElementById("cerrarChat");
const mensajes = document.getElementById("chatMensajes");
const inputChat = document.getElementById("mensajeUsuario");
const enviarChat = document.getElementById("enviarMensaje");

abrirChat?.addEventListener("click", () => {
    chatBox.style.display = "block";
});

cerrarChat?.addEventListener("click", () => {
    chatBox.style.display = "none";
});

function respuestaIA(texto){

    if (texto.includes("envío")) return "Sí, hacemos envíos 🚚";
    if (texto.includes("precio")) return "Los precios varían según el ramo 💐";
    if (texto.includes("whatsapp")) return "Nuestro WhatsApp es 829-692-6964 📱";

    return "Te puedo ayudar con envíos, precios o pedidos 💖";
}

enviarChat?.addEventListener("click", () => {

    const texto = inputChat.value.trim();
    if (!texto) return;

    mensajes.innerHTML += `<div class="usuario">${texto}</div>`;

    setTimeout(() => {
        mensajes.innerHTML += `<div class="bot">${respuestaIA(texto.toLowerCase())}</div>`;
    }, 400);

    inputChat.value = "";
});

/* ======================
CONTADORES
====================== */

function contar(id, max, speed = 20) {
    const el = document.getElementById(id);
    if (!el) return;

    let i = 0;

    const interval = setInterval(() => {
        i++;
        el.innerText = i;
        if (i >= max) clearInterval(interval);
    }, speed);
}

window.addEventListener("load", () => {
    contar("clientes", 1200, 2);
    contar("ventas", 850, 3);
    contar("envios", 640, 3);
    contar("calificacion", 5, 400);
});

/* ======================
RESEÑAS AUTOMÁTICAS
====================== */

const opiniones = [
    ["Quedó precioso 💐", "Ashley"],
    ["Entrega rápida y hermoso", "Daniela"],
    ["Volveré a comprar", "Camila"]
];

const grid = document.querySelector(".opiniones-grid");

function cargarOpiniones(){

    if (!grid) return;

    grid.innerHTML = "";

    opiniones.forEach(op => {
        grid.innerHTML += `
            <div class="opinion">
                ★★★★★
                <p>${op[0]}</p>
                <h4>- ${op[1]}</h4>
            </div>
        `;
    });
}

window.addEventListener("load", cargarOpiniones);
