/*====================================================
                LILITH BLOMS PRO FINAL
====================================================*/

const STORAGE_CARRITO = "lb_carrito";
const STORAGE_FAVORITOS = "lb_favoritos";
const STORAGE_TEMA = "lb_tema";

/*==============================
        ESTADO GLOBAL
==============================*/

let carrito = JSON.parse(localStorage.getItem(STORAGE_CARRITO)) || [];
let favoritos = JSON.parse(localStorage.getItem(STORAGE_FAVORITOS)) || [];

/*==============================
        ELEMENTOS
==============================*/

const carritoBtn = document.getElementById("carrito");
const favoritosBtn = document.getElementById("favoritos");

const carritoLateral = document.getElementById("carritoLateral");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const overlay = document.getElementById("overlay");

const carritoItems = document.querySelector(".carrito-items");
const carritoTotal = document.querySelector(".carrito-total h3");

const contadorCarrito = document.querySelector("#carrito span");
const contadorFavoritos = document.querySelector("#favoritos span");

/*==============================
        INICIO
==============================*/

document.addEventListener("DOMContentLoaded", () => {

    cargarTema();
    renderCarrito();
    renderFavoritos();
    activarProductos();
    activarUI();
    activarFAQ();
    activarContadores();
});

/*==============================
        UI GENERAL
==============================*/

function activarUI(){

    carritoBtn.onclick = abrirCarrito;
    cerrarCarrito.onclick = cerrarCarritoFn;
    overlay.onclick = cerrarCarritoFn;

    document.getElementById("modoOscuro").onclick = toggleTema;
}

/*==============================
        CARRITO
==============================*/

function activarProductos(){

    document.querySelectorAll(".producto button").forEach(btn => {

        btn.addEventListener("click", () => {

            const producto = btn.closest(".producto");

            const nombre = producto.querySelector("h3").innerText;

            const precio = parseInt(
                producto.querySelector("p").innerText
                .replace("RD$", "")
                .replace(",", "")
            );

            const imagen = producto.querySelector("img").src;

            const existe = carrito.find(p => p.nombre === nombre);

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

            save();
            renderCarrito();
            toast("🛒 Agregado al carrito");

        });

    });

}

function renderCarrito(){

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

        const subtotal = p.precio * p.cantidad;
        total += subtotal;
        count += p.cantidad;

        const div = document.createElement("div");

        div.innerHTML = `
            <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px">
                <img src="${p.imagen}" width="50" style="border-radius:10px">

                <div style="flex:1">
                    <strong>${p.nombre}</strong>
                    <p>RD$${p.precio}</p>

                    <div>
                        <button onclick="menos(${i})">-</button>
                        ${p.cantidad}
                        <button onclick="mas(${i})">+</button>
                    </div>

                    <small>Subtotal: RD$${subtotal}</small>
                </div>

                <button onclick="eliminar(${i})">X</button>
            </div>
        `;

        carritoItems.appendChild(div);

    });

    carritoTotal.innerText = `Total: RD$${total}`;
    contadorCarrito.innerText = count;

}

window.mas = (i) => {
    carrito[i].cantidad++;
    save();
    renderCarrito();
};

window.menos = (i) => {
    carrito[i].cantidad--;
    if (carrito[i].cantidad <= 0) carrito.splice(i, 1);
    save();
    renderCarrito();
};

window.eliminar = (i) => {
    carrito.splice(i, 1);
    save();
    renderCarrito();
};

/*==============================
        FAVORITOS
==============================*/

function renderFavoritos(){
    contadorFavoritos.innerText = favoritos.length;
}

document.querySelectorAll(".producto").forEach(p => {

    const btn = document.createElement("button");

    btn.innerText = "❤";

    p.appendChild(btn);

    const nombre = p.querySelector("h3").innerText;

    if (favoritos.includes(nombre)) btn.style.color = "red";

    btn.onclick = () => {

        if (favoritos.includes(nombre)) {
            favoritos = favoritos.filter(f => f !== nombre);
            btn.style.color = "";
        } else {
            favoritos.push(nombre);
            btn.style.color = "red";
        }

        localStorage.setItem(STORAGE_FAVORITOS, JSON.stringify(favoritos));
        renderFavoritos();

    };

});

/*==============================
        TEMA OSCURO
==============================*/

function toggleTema(){

    document.body.classList.toggle("dark");

    localStorage.setItem(
        STORAGE_TEMA,
        document.body.classList.contains("dark") ? "oscuro" : "claro"
    );

}

function cargarTema(){
    if (localStorage.getItem(STORAGE_TEMA) === "oscuro") {
        document.body.classList.add("dark");
    }
}

/*==============================
        WHATSAPP
==============================*/

document.querySelector(".carrito-total button").onclick = () => {

    if (carrito.length === 0) return toast("Carrito vacío");

    let msg = "Hola, quiero este pedido:%0A%0A";

    let total = 0;

    carrito.forEach(p => {
        const sub = p.precio * p.cantidad;
        total += sub;
        msg += `• ${p.nombre} x${p.cantidad} = RD$${sub}%0A`;
    });

    msg += `%0ATotal: RD$${total}`;

    window.open(
        `https://wa.me/18296926964?text=${msg}`,
        "_blank"
    );

};

/*==============================
        TOAST
==============================*/

function toast(text){

    const div = document.createElement("div");

    div.innerText = text;

    div.style.position = "fixed";
    div.style.bottom = "20px";
    div.style.left = "50%";
    div.style.transform = "translateX(-50%)";
    div.style.background = "#e91e63";
    div.style.color = "white";
    div.style.padding = "10px 20px";
    div.style.borderRadius = "20px";
    div.style.zIndex = "9999";

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 2000);

}

/*==============================
        CARRITO OPEN/CLOSE
==============================*/

function abrirCarrito(){
    carritoLateral.classList.add("active");
    overlay.classList.add("active");
}

function cerrarCarritoFn(){
    carritoLateral.classList.remove("active");
    overlay.classList.remove("active");
}

/*==============================
        SAVE
==============================*/

function save(){
    localStorage.setItem(STORAGE_CARRITO, JSON.stringify(carrito));
}

/*==============================
        FAQ
==============================*/

function activarFAQ(){

    document.querySelectorAll(".faq-item button").forEach(btn => {

        btn.onclick = () => {

            const div = btn.nextElementSibling;

            div.style.display = div.style.display === "block" ? "none" : "block";

        };

    });

}

/*==============================
        CONTADORES
==============================*/

function activarContadores(){

    const section = document.querySelector(".contador");

    let done = false;

    window.addEventListener("scroll", () => {

        if (done) return;

        if (section.getBoundingClientRect().top < window.innerHeight) {

            done = true;

            anim("#clientes", 1500);
            anim("#ventas", 800);
            anim("#envios", 1000);
            anim("#calificacion", 4.9, true);

        }

    });

}

function anim(id, val, dec = false){

    let el = document.querySelector(id);
    let i = 0;

    let interval = setInterval(() => {

        i += dec ? 0.1 : 10;

        if (i >= val) {
            i = val;
            clearInterval(interval);
        }

        el.innerText = dec ? i.toFixed(1) : Math.floor(i);

    }, 20);

}

console.log("Lilith Blooms PRO listo 🌸");
