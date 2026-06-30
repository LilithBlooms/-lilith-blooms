/*======================
CARRO Y FUNCIONES BASE
======================*/

let carrito = [];
let contadorCarrito = document.querySelector("#carrito span");
let carritoBtn = document.getElementById("carrito");
let carritoLateral = document.getElementById("carritoLateral");
let cerrarCarrito = document.getElementById("cerrarCarrito");
let overlay = document.getElementById("overlay");
let carritoItems = document.querySelector(".carrito-items");
let carritoTotal = document.querySelector(".carrito-total h3");

/*======================
ABRIR / CERRAR CARRITO
======================*/

carritoBtn.addEventListener("click", () => {
    carritoLateral.classList.add("active");
    overlay.classList.add("active");
});

cerrarCarrito.addEventListener("click", () => {
    carritoLateral.classList.remove("active");
    overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
    carritoLateral.classList.remove("active");
    overlay.classList.remove("active");
});

/*======================
AGREGAR AL CARRITO
======================*/

document.querySelectorAll(".agregar").forEach(btn => {
    btn.addEventListener("click", (e) => {
        let producto = e.target.parentElement;
        let nombre = producto.querySelector("h3").innerText;
        let precio = parseInt(producto.querySelector("p").innerText.replace("RD$", ""));

        carrito.push({ nombre, precio });

        actualizarCarrito();
    });
});

function actualizarCarrito() {

    carritoItems.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {

        total += item.precio;

        let div = document.createElement("div");

        div.innerHTML = `
            <p>${item.nombre}</p>
            <p>RD$${item.precio}</p>
            <button onclick="eliminar(${index})">X</button>
        `;

        carritoItems.appendChild(div);

    });

    carritoTotal.innerText = "Total: RD$" + total;
    contadorCarrito.innerText = carrito.length;
}

function eliminar(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

/*======================
CONTADORES ANIMADOS
======================*/

let ejecutado = false;

window.addEventListener("scroll", () => {

    let contenedor = document.querySelector(".contador");

    if (!ejecutado && contenedor.getBoundingClientRect().top < window.innerHeight) {

        ejecutarContadores();
        ejecutado = true;

    }

});

function ejecutarContadores() {

    animar("#clientes", 1500);
    animar("#ventas", 800);
    animar("#envios", 1000);
    animar("#calificacion", 4.9, true);

}

function animar(id, valor, decimal = false) {

    let elemento = document.querySelector(id);
    let inicio = 0;

    let intervalo = setInterval(() => {

        inicio += decimal ? 0.1 : 10;

        if (inicio >= valor) {
            inicio = valor;
            clearInterval(intervalo);
        }

        elemento.innerText = decimal ? inicio.toFixed(1) : Math.floor(inicio);

    }, 20);

}

/*======================
FAQ ACORDEÓN
======================*/

document.querySelectorAll(".faq-item button").forEach(btn => {

    btn.addEventListener("click", () => {

        let contenido = btn.nextElementSibling;

        contenido.style.display =
            contenido.style.display === "block" ? "none" : "block";

    });

});

/*======================
WHATSAPP CHECKOUT
======================*/

document.querySelector(".carrito-total button").addEventListener("click", () => {

    let mensaje = "Hola, quiero este pedido:%0A";

    carrito.forEach(item => {
        mensaje += `- ${item.nombre} RD$${item.precio}%0A`;
    });

    let url = `https://wa.me/18296926964?text=${mensaje}`;

    window.open(url, "_blank");

});

/*======================
INICIALIZACIÓN
======================*/

console.log("Lilith Bloms cargado correctamente 💐");
