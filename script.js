/*====================================================
                LILITH BLOMS PRO v2.0
        Sistema profesional de tienda online
====================================================*/

/*==============================
      VARIABLES GLOBALES
==============================*/

const STORAGE_CARRITO = "lb_carrito";
const STORAGE_FAVORITOS = "lb_favoritos";
const STORAGE_TEMA = "lb_tema";

let carrito = JSON.parse(localStorage.getItem(STORAGE_CARRITO)) || [];
let favoritos = JSON.parse(localStorage.getItem(STORAGE_FAVORITOS)) || [];

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
        INICIALIZACIÓN
==============================*/

document.addEventListener("DOMContentLoaded", () => {

    cargarTema();

    actualizarCarrito();

    actualizarFavoritos();

    activarBotonesProductos();

    activarModoOscuro();

    activarFAQ();

    activarContadores();

    activarCheckout();

});

/*==============================
      ABRIR CARRITO
==============================*/

carritoBtn.addEventListener("click", () => {

    carritoLateral.classList.add("active");

    overlay.classList.add("active");

});

/*==============================
      CERRAR CARRITO
==============================*/

cerrarCarrito.addEventListener("click", cerrarPanel);

overlay.addEventListener("click", cerrarPanel);

function cerrarPanel(){

    carritoLateral.classList.remove("active");

    overlay.classList.remove("active");

}

/*==============================
      ACTIVAR PRODUCTOS
==============================*/

function activarBotonesProductos(){

    document.querySelectorAll(".producto").forEach(producto=>{

        const boton = producto.querySelector("button");

        if(!boton) return;

        boton.addEventListener("click",()=>{

            agregarProducto(producto);

        });

    });

}

/*==============================
      AGREGAR PRODUCTO
==============================*/

function agregarProducto(producto){

    const nombre =
        producto.querySelector("h3").innerText;

    const precio =
        Number(
            producto.querySelector("p")
            .innerText
            .replace("RD$","")
            .replace(",","")
            .trim()
        );

    const imagen =
        producto.querySelector("img").src;

    const existente =
        carrito.find(item=>item.nombre===nombre);

    if(existente){

        existente.cantidad++;

    }else{

        carrito.push({

            nombre,

            precio,

            imagen,

            cantidad:1

        });

    }

    guardarCarrito();

    actualizarCarrito();

    toast("🛒 Producto agregado");

}

/*==============================
      GUARDAR
==============================*/

function guardarCarrito(){

    localStorage.setItem(

        STORAGE_CARRITO,

        JSON.stringify(carrito)

    );

}
/*==============================
      ACTUALIZAR CARRITO
==============================*/

function actualizarCarrito(){

    carritoItems.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    if(carrito.length === 0){

        carritoItems.innerHTML = `
            <div class="carrito-vacio">
                <h3>🛒</h3>
                <p>Tu carrito está vacío.</p>
            </div>
        `;

        carritoTotal.innerHTML = "Total: RD$0";
        contadorCarrito.innerText = "0";

        return;
    }

    carrito.forEach((producto,index)=>{

        const subtotal =
            producto.precio * producto.cantidad;

        total += subtotal;

        cantidadTotal += producto.cantidad;

        const card = document.createElement("div");

        card.className = "item-carrito";

        card.innerHTML = `

            <img src="${producto.imagen}" alt="${producto.nombre}">

            <div class="item-info">

                <h4>${producto.nombre}</h4>

                <p>RD$${producto.precio}</p>

                <div class="cantidad">

                    <button class="menos" data-index="${index}">−</button>

                    <span>${producto.cantidad}</span>

                    <button class="mas" data-index="${index}">+</button>

                </div>

                <strong>

                    Subtotal:

                    RD$${subtotal}

                </strong>

            </div>

            <button
                class="eliminar"
                data-index="${index}">
                🗑
            </button>

        `;

        carritoItems.appendChild(card);

    });

    contadorCarrito.innerText = cantidadTotal;

    carritoTotal.innerHTML = `

        Total:

        <span>

        RD$${total}

        </span>

    `;

    activarBotonesCarrito();

}

/*==============================
 BOTONES DEL CARRITO
==============================*/

function activarBotonesCarrito(){

    document.querySelectorAll(".mas").forEach(btn=>{

        btn.onclick=()=>{

            carrito[btn.dataset.index].cantidad++;

            guardarCarrito();

            actualizarCarrito();

        };

    });

    document.querySelectorAll(".menos").forEach(btn=>{

        btn.onclick=()=>{

            let producto =
                carrito[btn.dataset.index];

            producto.cantidad--;

            if(producto.cantidad<=0){

                carrito.splice(btn.dataset.index,1);

            }

            guardarCarrito();

            actualizarCarrito();

        };

    });

    document.querySelectorAll(".eliminar").forEach(btn=>{

        btn.onclick=()=>{

            carrito.splice(btn.dataset.index,1);

            guardarCarrito();

            actualizarCarrito();

            toast("🗑 Producto eliminado");

        };

    });
    

}
/*====================================================
                FAVORITOS
====================================================*/

function actualizarFavoritos(){

    contadorFavoritos.innerText = favoritos.length;

    localStorage.setItem(
        STORAGE_FAVORITOS,
        JSON.stringify(favoritos)
    );

}

document.querySelectorAll(".producto").forEach((producto)=>{

    let favorito = document.createElement("button");

    favorito.className = "btn-favorito";

    favorito.innerHTML = '<i class="fa-solid fa-heart"></i>';

    producto.appendChild(favorito);

    favorito.addEventListener("click",(e)=>{

        e.stopPropagation();

        const nombre = producto.querySelector("h3").innerText;

        if(favoritos.includes(nombre)){

            favoritos = favoritos.filter(item=>item!==nombre);

            favorito.classList.remove("activo");

            toast("💔 Eliminado de favoritos");

        }else{

            favoritos.push(nombre);

            favorito.classList.add("activo");

            toast("❤️ Agregado a favoritos");

        }

        actualizarFavoritos();

    });

    if(favoritos.includes(producto.querySelector("h3").innerText)){

        favorito.classList.add("activo");

    }

});


/*====================================================
                MODO OSCURO
====================================================*/

function activarModoOscuro(){

    const boton=document.getElementById("modoOscuro");

    if(localStorage.getItem(STORAGE_TEMA)==="oscuro"){

        document.body.classList.add("dark");

    }

    boton.onclick=()=>{

        document.body.classList.toggle("dark");

        localStorage.setItem(

            STORAGE_TEMA,

            document.body.classList.contains("dark")
            ? "oscuro"
            : "claro"

        );

    };

}

function cargarTema(){

    if(localStorage.getItem(STORAGE_TEMA)==="oscuro"){

        document.body.classList.add("dark");

    }

}


/*====================================================
                TOAST
====================================================*/

function toast(texto){

    let aviso=document.createElement("div");

    aviso.className="toast";

    aviso.innerText=texto;

    document.body.appendChild(aviso);

    setTimeout(()=>{

        aviso.classList.add("mostrar");

    },50);

    setTimeout(()=>{

        aviso.classList.remove("mostrar");

        setTimeout(()=>{

            aviso.remove();

        },300);

    },2500);

}
/*====================================================
                FAVORITOS
====================================================*/

function actualizarFavoritos(){

    contadorFavoritos.innerText = favoritos.length;

    localStorage.setItem(
        STORAGE_FAVORITOS,
        JSON.stringify(favoritos)
    );

}

document.querySelectorAll(".producto").forEach((producto)=>{

    let favorito = document.createElement("button");

    favorito.className = "btn-favorito";

    favorito.innerHTML = '<i class="fa-solid fa-heart"></i>';

    producto.appendChild(favorito);

    favorito.addEventListener("click",(e)=>{

        e.stopPropagation();

        const nombre = producto.querySelector("h3").innerText;

        if(favoritos.includes(nombre)){

            favoritos = favoritos.filter(item=>item!==nombre);

            favorito.classList.remove("activo");

            toast("💔 Eliminado de favoritos");

        }else{

            favoritos.push(nombre);

            favorito.classList.add("activo");

            toast("❤️ Agregado a favoritos");

        }

        actualizarFavoritos();

    });

    if(favoritos.includes(producto.querySelector("h3").innerText)){

        favorito.classList.add("activo");

    }

});


/*====================================================
                MODO OSCURO
====================================================*/

function activarModoOscuro(){

    const boton=document.getElementById("modoOscuro");

    if(localStorage.getItem(STORAGE_TEMA)==="oscuro"){

        document.body.classList.add("dark");

    }

    boton.onclick=()=>{

        document.body.classList.toggle("dark");

        localStorage.setItem(

            STORAGE_TEMA,

            document.body.classList.contains("dark")
            ? "oscuro"
            : "claro"

        );

    };

}

function cargarTema(){

    if(localStorage.getItem(STORAGE_TEMA)==="oscuro"){

        document.body.classList.add("dark");

    }

}


/*====================================================
                TOAST
====================================================*/

function toast(texto){

    let aviso=document.createElement("div");

    aviso.className="toast";

    aviso.innerText=texto;

    document.body.appendChild(aviso);

    setTimeout(()=>{

        aviso.classList.add("mostrar");

    },50);

    setTimeout(()=>{

        aviso.classList.remove("mostrar");

        setTimeout(()=>{

            aviso.remove();

        },300);

    },2500);

}
