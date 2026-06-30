/*======================
CARRITO
======================*/

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contadorCarrito = document.querySelector("#carrito span");
const carritoBtn = document.getElementById("carrito");
const carritoLateral = document.getElementById("carritoLateral");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const overlay = document.getElementById("overlay");
const carritoItems = document.querySelector(".carrito-items");
const carritoTotal = document.querySelector(".carrito-total h3");

carritoBtn.onclick = () => {
    carritoLateral.classList.add("active");
    overlay.classList.add("active");
};

function cerrar() {
    carritoLateral.classList.remove("active");
    overlay.classList.remove("active");
}

cerrarCarrito.onclick = cerrar;
overlay.onclick = cerrar;

document.querySelectorAll(".producto button").forEach(btn => {
    btn.onclick = () => {
        const p = btn.closest(".producto");

        const nombre = p.querySelector("h3").innerText;
        const precio = Number(p.querySelector("p").innerText.replace("RD$", "").replace(",", ""));
        const imagen = p.querySelector("img").src;

        carrito.push({ nombre, precio, imagen, cantidad: 1 });

        actualizarCarrito();
    };
});

function actualizarCarrito() {

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

actualizarCarrito();

/*======================
FAVORITOS
======================*/

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
const contadorFavoritos = document.querySelector("#favoritos span");

document.querySelectorAll(".producto").forEach(p => {
    let btn = document.createElement("button");
    btn.innerText = "🤍";
    btn.style.marginTop = "10px";
    btn.onclick = () => {

        const nombre = p.querySelector("h3").innerText;

        if (favoritos.includes(nombre)) {
            favoritos = favoritos.filter(f => f !== nombre);
            btn.innerText = "🤍";
        } else {
            favoritos.push(nombre);
            btn.innerText = "❤️";
        }

        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        contadorFavoritos.innerText = favoritos.length;
    };

    p.appendChild(btn);
});

contadorFavoritos.innerText = favoritos.length;

/*======================
CONTADORES
======================*/

let ejecutado = false;

window.addEventListener("scroll", () => {
    let cont = document.querySelector(".contador");

    if (!ejecutado && cont.getBoundingClientRect().top < window.innerHeight) {
        animar("#clientes", 1500);
        animar("#ventas", 800);
        animar("#envios", 1000);
        animar("#calificacion", 4.9, true);
        ejecutado = true;
    }
});

function animar(id, valor, decimal = false) {
    let el = document.querySelector(id);
    let i = 0;

    let interval = setInterval(() => {
        i += decimal ? 0.1 : 10;

        if (i >= valor) {
            i = valor;
            clearInterval(interval);
        }

        el.innerText = decimal ? i.toFixed(1) : Math.floor(i);
    }, 20);
}

/*======================
FAQ
======================*/

document.querySelectorAll(".faq-item button").forEach(btn => {
    btn.onclick = () => {
        let div = btn.nextElementSibling;
        div.style.display = div.style.display === "block" ? "none" : "block";
    };
});

/*======================
WHATSAPP
======================*/

document.querySelector(".carrito-total button").onclick = () => {

    let msg = "Hola, quiero este pedido:%0A";

    carrito.forEach(i => {
        msg += `- ${i.nombre} RD$${i.precio}%0A`;
    });

    window.open(`https://wa.me/18296926964?text=${msg}`, "_blank");
};

console.log("Sistema restaurado 💐");
