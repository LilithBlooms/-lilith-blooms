// Estado global del carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Elementos del carrito
const contadorCarrito = document.querySelector("#carrito span");
const carritoBtn = document.getElementById("carrito");
const carritoLateral = document.getElementById("carritoLateral");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const overlay = document.getElementById("overlay");
const carritoItems = document.querySelector(".carrito-items");
const carritoTotal = document.querySelector(".carrito-total h3");

// Abrir/Cerrar carrito
function cerrarCarritoFn() {
    carritoLateral.classList.remove("active");
    overlay.classList.remove("active");
}

if (carritoBtn) {
    carritoBtn.addEventListener("click", () => {
        carritoLateral.classList.add("active");
        overlay.classList.add("active");
    });
}

if (cerrarCarrito) cerrarCarrito.addEventListener("click", cerrarCarritoFn);
if (overlay) overlay.addEventListener("click", cerrarCarritoFn);

// Agregar productos al carrito
document.querySelectorAll(".producto button").forEach(btn => {
    btn.addEventListener("click", () => {
        const producto = btn.closest(".producto");
        const nombre = producto.querySelector("h3").innerText;
        const precio = Number(producto.querySelector("p").innerText.replace("RD$", "").replace(",", ""));
        const imagen = producto.querySelector("img").src;

        // Verificar si ya existe el producto en el carrito
        const existe = carrito.find(item => item.nombre === nombre);
        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push({
                nombre,
                precio,
                imagen,
                cantidad: 1
            });
        }

        actualizarCarrito();
    });
});

// Actualizar carrito en el DOM
function actualizarCarrito() {
    carritoItems.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        carritoItems.innerHTML += `
            <div class="item-carrito" style="display:flex;gap:10px;align-items:center;margin:10px 0;">
                <img src="${item.imagen}" style="width:60px;height:60px;object-fit:cover;border-radius:10px;">
                <div style="flex:1;">
                    <strong>${item.nombre}</strong>
                    <p>RD$${item.precio}</p>
                    <div>
                        <button onclick="restar(${index})">-</button>
                        <span>${item.cantidad}</span>
                        <button onclick="sumar(${index})">+</button>
                    </div>
                </div>
                <button onclick="eliminar(${index})">🗑️</button>
            </div>
        `;
    });

    carritoTotal.innerText = "Total: RD$" + total.toLocaleString();
    contadorCarrito.innerText = carrito.length;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Funciones para modificar el carrito
function eliminar(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function sumar(index) {
    carrito[index].cantidad++;
    actualizarCarrito();
}

function restar(index) {
    carrito[index].cantidad--;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    actualizarCarrito();
}

// Inicializar carrito
actualizarCarrito();

// Envío de formulario personalizado por WhatsApp
document.getElementById("formPersonalizar")?.addEventListener("submit", function(e) {
    e.preventDefault();

    let selects = this.querySelectorAll("select");
    let flor = selects[0].value;
    let color = selects[1].value;
    let cantidad = this.querySelector("input").value;
    let papel = selects[2].value;
    let mono = selects[3].value;
    let mensajeExtra = this.querySelector("textarea").value;

    let mensaje = `Hola 👋 quiero un ramo personalizado:%0A
🌸 Flor: ${flor}%0A
🎨 Color: ${color}%0A
💐 Cantidad: ${cantidad}%0A
📦 Papel: ${papel}%0A
🎀 Moño: ${mono}%0A`;

    if (mensajeExtra) {
        mensaje += `%0A💌 Mensaje: ${mensajeExtra}`;
    }

    window.open(
        "https://wa.me/18296926964?text=" + mensaje,
        "_blank"
    );
});

// Música ambiente
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let playing = false;

musicBtn?.addEventListener("click", async () => {
    try {
        if (!playing) {
            await music.play();
            musicBtn.innerText = "⏸️ Pausar música";
            playing = true;
        } else {
            music.pause();
            musicBtn.innerText = "🎵 Modo ambiente";
            playing = false;
        }
    } catch (e) {
        console.log("El navegador bloqueó el audio hasta interacción.");
    }
});

// Chat IA simple
const abrirChat = document.getElementById("abrirChat");
const cerrarChat = document.getElementById("cerrarChat");
const chatBox = document.getElementById("chatBox");
const chatMensajes = document.getElementById("chatMensajes");
const input = document.getElementById("mensajeUsuario");
const enviar = document.getElementById("enviarMensaje");

abrirChat?.addEventListener("click", () => chatBox.style.display = "flex");
cerrarChat?.addEventListener("click", () => chatBox.style.display = "none");

function agregarMensaje(texto, clase) {
    chatMensajes.innerHTML += `<div class="${clase}">${texto}</div>`;
    chatMensajes.scrollTop = chatMensajes.scrollHeight;
}

function responder(texto) {
    texto = texto.toLowerCase();
    if (texto.includes("envío")) return "🚚 Sí, hacemos envíos en RD.";
    if (texto.includes("precio")) return "💐 Tenemos diferentes precios según el ramo.";
    if (texto.includes("hola")) return "🌸 ¡Hola! ¿En qué te puedo ayudar?";
    return "🌸 Escríbenos por WhatsApp para más info.";
}

function enviarMensaje() {
    let texto = input.value.trim();
    if (!texto) return;

    agregarMensaje(texto, "usuario");

    setTimeout(() => {
        agregarMensaje(responder(texto), "bot");
    }, 500);

    input.value = "";
}

enviar?.addEventListener("click", enviarMensaje);
input?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") enviarMensaje();
});

// Fade in al cargar
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});
