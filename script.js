
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

/* abrir/cerrar */
carritoBtn.onclick = () => {
    carritoLateral.classList.add("active");
    overlay.classList.add("active");
};

cerrarCarrito.onclick = cerrar;
overlay.onclick = cerrar;

function cerrar() {
    carritoLateral.classList.remove("active");
    overlay.classList.remove("active");
}

/* agregar productos */
document.querySelectorAll(".producto button").forEach(btn => {
    btn.onclick = () => {
        const producto = btn.closest(".producto");

        const nombre = producto.querySelector("h3").innerText;

        const precio = Number(
            producto.querySelector("p").innerText.replace("RD$", "").replace(",", "")
        );

        const imagen = producto.querySelector("img").src;

        carrito.push({ nombre, precio, imagen, cantidad: 1 });

        actualizarCarrito();
    };
});

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

/*======================
AGREGAR PRODUCTOS AL CARRITO
======================*/

document.querySelectorAll(".producto button").forEach(btn=>{

    btn.addEventListener("click",()=>{

        const producto = btn.closest(".producto");

        const nombre = producto.querySelector("h3").innerText;

        const precio = Number(
            producto.querySelector("p")
            .innerText
            .replace("RD$","")
            .replace(",","")
        );

        const imagen = producto.querySelector("img").src;

        carrito.push({

            nombre,
            precio,
            imagen,
            cantidad:1

        });

        actualizarCarrito();

        
 function actualizarCarrito(){

    carritoItems.innerHTML="";

    let total=0;

    carrito.forEach((item,index)=>{

        total += item.precio * item.cantidad;

        carritoItems.innerHTML += `

        <div style="
        display:flex;
        gap:12px;
        margin:15px 0;
        align-items:center;
        ">

            <img
            src="${item.imagen}"
            style="
            width:70px;
            height:70px;
            object-fit:cover;
            border-radius:12px;
            ">

            <div style="flex:1;">

                <strong>${item.nombre}</strong>

                <p>
                RD$${item.precio}
                </p>

                <div>

                    <button onclick="restar(${index})">−</button>

                    <span style="margin:0 8px;">
                    ${item.cantidad}
                    </span>

                    <button onclick="sumar(${index})">+</button>

                </div>

            </div>

            <button onclick="eliminar(${index})">

                🗑️

            </button>

        </div>

        `;

    });

    carritoTotal.innerHTML=

    "Total: RD$"+total.toLocaleString();

    contadorCarrito.innerHTML=carrito.length;

localStorage.setItem("carrito", JSON.stringify(carrito));}   });

});eliminar(${index})">X</button>
        `;

        carritoItems.appendChild(div);

    });

    carritoTotal.innerText = "Total: RD$" + total;
    contadorCarrito.innerText = carrito.length;
}

function eliminar(index) {
    carrito.splice(index, 1);
    actualizarCarrito();

function sumar(index){

    carrito[index].cantidad++;

    actualizarCarrito();

}

function restar(index){

    carrito[index].cantidad--;

    if(carrito[index].cantidad<=0){

        carrito.splice(index,1);

    }

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

/*======================
LILITH AI
======================*/

const abrirChat = document.getElementById("abrirChat");
const cerrarChat = document.getElementById("cerrarChat");
const chatBox = document.getElementById("chatBox");
const chatMensajes = document.getElementById("chatMensajes");
const mensajeUsuario = document.getElementById("mensajeUsuario");
const enviarMensaje = document.getElementById("enviarMensaje");

abrirChat.onclick = () => {
    chatBox.style.display = "flex";
}

cerrarChat.onclick = () => {
    chatBox.style.display = "none";
}

function responder(texto){

    texto = texto.toLowerCase();

    if(texto.includes("envio") || texto.includes("envíos")){
        return "🚚 Sí. Realizamos envíos. Escríbenos por WhatsApp para confirmar disponibilidad según tu ubicación.";
    }

    if(texto.includes("personal")){
        return "🎀 ¡Claro! Personalizamos colores, flores, papel, moños y mensajes para que tu ramo sea único.";
    }

    if(texto.includes("whatsapp") || texto.includes("telefono") || texto.includes("número")){
        return "📱 Puedes escribirnos al +1 (829) 692-6964.";
    }

    if(texto.includes("precio") || texto.includes("cuesta") || texto.includes("vale")){
        return "💐 Tenemos ramos para diferentes presupuestos. Escríbenos por WhatsApp y te enviaremos el catálogo actualizado.";
    }

    if(texto.includes("tarda") || texto.includes("tiempo")){
        return "⏰ Normalmente los pedidos se entregan entre 24 y 48 horas, dependiendo del nivel de personalización.";
    }

    if(texto.includes("pago")){
        return "💳 Aceptamos varios métodos de pago. Contáctanos para indicarte las opciones disponibles.";
    }

    if(texto.includes("color")){
        return "🌈 Tenemos una gran variedad de colores de limpiapipas para personalizar tu ramo.";
    }

    if(texto.includes("hola")){
        return "🌸 ¡Hola! Bienvenido(a) a Lilith Bloms. ¿Cómo puedo ayudarte hoy?";
    }

    return "🌸 No encontré una respuesta para esa pregunta. Escríbenos por WhatsApp al +1 (829) 692-6964 y con gusto te ayudaremos.";
}

function agregarMensaje(texto, clase){

    chatMensajes.innerHTML += `
        <div class="${clase}">
            ${texto}
        </div>
    `;

    chatMensajes.scrollTop = chatMensajes.scrollHeight;

}

function enviar(){

    let texto = mensajeUsuario.value.trim();

    if(texto == "") return;

    agregarMensaje(texto,"usuario");

    let respuesta = responder(texto);

    setTimeout(()=>{
        agregarMensaje(respuesta,"bot");
    },600);

    mensajeUsuario.value="";

}

enviarMensaje.onclick = enviar;

mensajeUsuario.addEventListener("keypress",function(e){

    if(e.key==="Enter"){
        enviar();
    }

});

document.querySelectorAll(".pregunta").forEach(btn=>{

    btn.onclick=()=>{

        agregarMensaje(btn.innerText,"usuario");

        let respuesta=responder(btn.innerText);

        setTimeout(()=>{
            agregarMensaje(respuesta,"bot");
        },500);

    }

});

/*======================
CONSTRUCTOR DE RAMOS
======================*/

const flor = document.getElementById("flor");
const color = document.getElementById("color");
const cantidad = document.getElementById("cantidad");
const papel = document.getElementById("papel");
const mono = document.getElementById("mono");
const peluche = document.getElementById("peluche");
const tarjeta = document.getElementById("tarjeta");

const resFlor = document.getElementById("resFlor");
const resColor = document.getElementById("resColor");
const resCantidad = document.getElementById("resCantidad");
const resPapel = document.getElementById("resPapel");
const resMono = document.getElementById("resMono");
const extras = document.getElementById("extras");

const precioFinal = document.getElementById("precioFinal");

function actualizarConstructor(){

    let precio = Number(cantidad.value) * 80;

    let listaExtras = [];

    if(peluche.checked){
        precio += 350;
        listaExtras.push("🧸 Peluche");
    }

    if(tarjeta.checked){
        precio += 100;
        listaExtras.push("💌 Tarjeta");
    }

    resFlor.innerHTML = "🌸 Flor: " + flor.value;
    resColor.innerHTML = "🎨 Color: " + color.value;
    resCantidad.innerHTML = "💐 Cantidad: " + cantidad.value;
    resPapel.innerHTML = "📦 Papel: " + papel.value;
    resMono.innerHTML = "🎀 Moño: " + mono.value;

    if(listaExtras.length > 0){
        extras.innerHTML = "✨ Extras: " + listaExtras.join(", ");
    }else{
        extras.innerHTML = "✨ Extras: Ninguno";
    }

    precioFinal.innerHTML = "RD$ " + precio.toLocaleString();

}

[
    flor,
    color,
    cantidad,
    papel,
    mono,
    peluche,
    tarjeta
].forEach(item=>{

    item.addEventListener("change",actualizarConstructor);

});

actualizarConstructor();
actualizarCarrito();

/*======================
AGREGAR AL CARRITO
======================*/

document
.getElementById("agregarPersonalizado")
.addEventListener("click",()=>{

    alert("🌸 ¡Tu ramo personalizado fue agregado al carrito!");

});

/*======================
FAVORITOS
======================*/

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

const contadorFavoritos =
document.querySelector("#favoritos span");

function actualizarFavoritos(){

    contadorFavoritos.innerHTML = favoritos.length;

    localStorage.setItem(

        "favoritos",

        JSON.stringify(favoritos)

    );

}

document.querySelectorAll(".favorito-btn").forEach(btn=>{

    btn.onclick=()=>{

        const producto = btn.closest(".producto");

        const nombre = producto.querySelector("h3").innerText;

        if(favoritos.includes(nombre)){

            favoritos = favoritos.filter(item=>item!==nombre);

            btn.classList.remove("activo");

            btn.innerHTML="🤍";

        }else{

            favoritos.push(nombre);

            btn.classList.add("activo");

            btn.innerHTML="❤️";

        }

        actualizarFavoritos();

    }

});

actualizarFavoritos();
