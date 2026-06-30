/*======================
CARRITO LIMPIO Y FUNCIONAL
======================*/

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contadorCarrito = document.querySelector("#carrito span");
const carritoBtn = document.getElementById("carrito");
const carritoLateral = document.getElementById("carritoLateral");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const overlay = document.getElementById("overlay");
const carritoItems = document.querySelector(".carrito-items");
const carritoTotal = document.querySelector(".carrito-total h3");

/* ======================
ABRIR / CERRAR CARRITO
====================== */

function cerrar() {
    carritoLateral.classList.remove("active");
    overlay.classList.remove("active");
}

if (carritoBtn) {
    carritoBtn.onclick = () => {
        carritoLateral.classList.add("active");
        overlay.classList.add("active");
    };
}

if (cerrarCarrito) cerrarCarrito.onclick = cerrar;
if (overlay) overlay.onclick = cerrar;

/* ======================
AGREGAR PRODUCTOS
====================== */

document.querySelectorAll(".producto button").forEach(btn => {
    btn.addEventListener("click", () => {
        const producto = btn.closest(".producto");

        const nombre = producto.querySelector("h3").innerText;

        const precio = Number(
            producto.querySelector("p").innerText
                .replace("RD$", "")
                .replace(",", "")
        );

        const imagen = producto.querySelector("img").src;

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

    carritoItems.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {

        total += item.precio * item.cantidad;

        carritoItems.innerHTML += `
            <div style="display:flex;gap:10px;align-items:center;margin:10px 0;">
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

/* ======================
FUNCIONES
====================== */

function eliminar(i) {
    carrito.splice(i, 1);
    actualizarCarrito();
}

function sumar(i) {
    carrito[i].cantidad++;
    actualizarCarrito();
}

function restar(i) {
    carrito[i].cantidad--;
    if (carrito[i].cantidad <= 0) carrito.splice(i, 1);
    actualizarCarrito();
}

/* ======================
INICIALIZAR
====================== */

actualizarCarrito();

document.getElementById("formPersonalizar").addEventListener("submit", function(e){
    e.preventDefault();
    

    let flor = this.querySelectorAll("select")[0].value;
    let color = this.querySelectorAll("select")[1].value;
    let cantidad = this.querySelector("input").value;
    let papel = this.querySelectorAll("select")[2].value;
    let mono = this.querySelectorAll("select")[3].value;
    let mensajeExtra = this.querySelector("textarea").value;

    let mensaje = "Hola 👋 buenas tardes.%0A%0A";
    mensaje += "Quiero hacer un ramo personalizado de limpiapipas.%0A%0A";
    mensaje += "🌸 Flor: " + flor + "%0A";
    mensaje += "🎨 Color: " + color + "%0A";
    mensaje += "💐 Cantidad: " + cantidad + "%0A";
    mensaje += "📦 Papel: " + papel + "%0A";
    mensaje += "🎀 Moño: " + mono + "%0A";

    if(mensajeExtra !== ""){
        mensaje += "%0A💌 Mensaje: " + mensajeExtra + "%0A";
    }

    let url = "https://wa.me/18296926964?text=" + mensaje;

    window.open(url, "_blank");
});
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let playing = false;

if (musicBtn && music && music.play) {
    musicBtn.addEventListener("click", async () => {
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
}
});
document.body.style.opacity = 0;

window.addEventListener("load", () => {
    document.body.style.transition = "1s ease";
    document.body.style.opacity = 1;
});
const abrirChat = document.getElementById("abrirChat");
const cerrarChat = document.getElementById("cerrarChat");
const chatBox = document.getElementById("chatBox");
const chatMensajes = document.getElementById("chatMensajes");
const mensajeUsuario = document.getElementById("mensajeUsuario");
const enviarMensaje = document.getElementById("enviarMensaje");

if (abrirChat && chatBox) {
    abrirChat.onclick = () => chatBox.style.display = "flex";
}

if (cerrarChat && chatBox) {
    cerrarChat.onclick = () => chatBox.style.display = "none";
}

function agregarMensaje(texto, clase) {
    if (!chatMensajes) return;

    chatMensajes.innerHTML += `
        <div class="${clase}">${texto}</div>
    `;

    chatMensajes.scrollTop = chatMensajes.scrollHeight;
}

function responder(texto) {
    texto = texto.toLowerCase();

    if (texto.includes("envio")) return "🚚 Sí, hacemos envíos.";
    if (texto.includes("precio")) return "💐 Tenemos diferentes precios según el ramo.";
    if (texto.includes("hola")) return "🌸 ¡Hola! ¿Cómo te ayudo?";

    return "🌸 Escríbenos por WhatsApp para más info.";
}

function enviar() {
    if (!mensajeUsuario) return;

    let texto = mensajeUsuario.value.trim();
    if (!texto) return;

    agregarMensaje(texto, "usuario");

    setTimeout(() => {
        agregarMensaje(responder(texto), "bot");
    }, 500);

    mensajeUsuario.value = "";
}

if (enviarMensaje) enviarMensaje.onclick = enviar;

if (mensajeUsuario) {
    mensajeUsuario.addEventListener("keypress", (e) => {
        if (e.key === "Enter") enviar();
    });
}

