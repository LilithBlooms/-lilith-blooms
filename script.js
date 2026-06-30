/* ======================
UTILIDAD SEGURA
====================== */
const $ = (id) => document.getElementById(id);

/* ======================
CARRITO
====================== */

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contadorCarrito = $("#carrito")?.querySelector("span");
const carritoBtn = $("#carrito");
const carritoLateral = $("#carritoLateral");
const cerrarCarrito = $("#cerrarCarrito");
const overlay = $("#overlay");
const carritoItems = document.querySelector(".carrito-items");
const carritoTotal = document.querySelector(".carrito-total h3");

function cerrar() {
    carritoLateral?.classList.remove("active");
    overlay?.classList.remove("active");
}

carritoBtn?.addEventListener("click", () => {
    carritoLateral?.classList.add("active");
    overlay?.classList.add("active");
});

cerrarCarrito?.addEventListener("click", cerrar);
overlay?.addEventListener("click", cerrar);

/* AGREGAR PRODUCTOS */
document.querySelectorAll(".producto button").forEach(btn => {
    btn.addEventListener("click", () => {
        const producto = btn.closest(".producto");
        if (!producto) return;

        const nombre = producto.querySelector("h3")?.innerText || "Producto";
        const precio = Number(
            (producto.querySelector("p")?.innerText || "0")
            .replace("RD$", "")
            .replace(",", "")
        );
        const imagen = producto.querySelector("img")?.src || "";

        carrito.push({ nombre, precio, imagen, cantidad: 1 });
        actualizarCarrito();
    });
});

function actualizarCarrito() {
    if (!carritoItems) return;

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
        </div>`;
    });

    if (carritoTotal) carritoTotal.innerText = "Total: RD$" + total.toLocaleString();
    if (contadorCarrito) contadorCarrito.innerText = carrito.length;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminar(i){ carrito.splice(i,1); actualizarCarrito(); }
function sumar(i){ carrito[i].cantidad++; actualizarCarrito(); }
function restar(i){
    carrito[i].cantidad--;
    if(carrito[i].cantidad<=0) carrito.splice(i,1);
    actualizarCarrito();
}

actualizarCarrito();

/* ======================
WHATSAPP PERSONALIZADO
====================== */

document.getElementById("formPersonalizar")?.addEventListener("submit", function(e){
    e.preventDefault();

    const selects = this.querySelectorAll("select");
    const input = this.querySelector("input");
    const textarea = this.querySelector("textarea");

    let mensaje = "Hola 👋 buenas tardes.%0A%0A";
    mensaje += "Quiero un ramo personalizado.%0A%0A";
    mensaje += "🌸 Tipo: " + (selects[0]?.value || "") + "%0A";
    mensaje += "🎨 Color: " + (selects[1]?.value || "") + "%0A";
    mensaje += "💐 Cantidad: " + (input?.value || "") + "%0A";
    mensaje += "📦 Papel: " + (selects[2]?.value || "") + "%0A";
    mensaje += "🎀 Moño: " + (selects[3]?.value || "") + "%0A";

    if(textarea?.value) {
        mensaje += "%0A💌 Mensaje: " + textarea.value;
    }

    window.open("https://wa.me/18296926964?text=" + mensaje, "_blank");
});

/* ======================
MÚSICA (FIX)
====================== */

const music = $("#bgMusic");
const musicBtn = $("#musicBtn");

let playing = false;

musicBtn?.addEventListener("click", async () => {
    if (!music) return;

    try {
        if (!playing) {
            await music.play();
            musicBtn.innerText = "⏸️ Pausar música";
        } else {
            music.pause();
            musicBtn.innerText = "🎵 Modo ambiente";
        }
        playing = !playing;
    } catch (e) {
        console.log("Error música:", e);
    }
});

/* ======================
ANIMACIÓN ENTRADA
====================== */

window.addEventListener("load", () => {
    document.body.style.opacity = 1;
});
