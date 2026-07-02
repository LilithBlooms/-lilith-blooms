const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carritoBtn = document.getElementById("carrito");
const carritoLateral = document.getElementById("carritoLateral");
const cerrar = document.getElementById("cerrarCarrito");
const overlay = document.getElementById("overlay");

const items = document.querySelector(".carrito-items");
const totalText = document.querySelector(".carrito-total h3");

/* CARDS */
document.querySelectorAll(".producto button").forEach(btn=>{
btn.onclick=()=>{
const p=btn.parentElement;
const nombre=p.querySelector("h3").innerText;
const precio=parseInt(p.querySelector("p").innerText.replace("RD$",""));

const existe=carrito.find(x=>x.nombre===nombre);

if(existe) existe.cantidad++;
else carrito.push({nombre,precio,cantidad:1});

localStorage.setItem("carrito",JSON.stringify(carrito));
render();
}
});

function render(){
items.innerHTML="";
let total=0;

carrito.forEach((p,i)=>{
total+=p.precio*p.cantidad;

items.innerHTML+=`
<div>
<strong>${p.nombre}</strong>
<p>RD$${p.precio}</p>
<button onclick="del(${i})">X</button>
</div>`;
});

totalText.innerText="Total RD$"+total;
}

window.del=(i)=>{
carrito.splice(i,1);
localStorage.setItem("carrito",JSON.stringify(carrito));
render();
};

carritoBtn.onclick=()=>{
carritoLateral.classList.add("active");
overlay.classList.add("active");
};

cerrar.onclick=close;
overlay.onclick=close;

function close(){
carritoLateral.classList.remove("active");
overlay.classList.remove("active");
}

render();

/* SEARCH PRO */
const buscar=document.getElementById("buscar");

buscar?.addEventListener("input",e=>{
document.querySelectorAll(".producto").forEach(p=>{
const n=p.querySelector("h3").innerText.toLowerCase();
p.style.display=n.includes(e.target.value.toLowerCase())?"block":"none";
});
});

/* CHAT IA */
const iaBoton=document.getElementById("ia-boton");
const iaChat=document.getElementById("ia-chat");
const iaClose=document.getElementById("ia-close");
const iaEnviar=document.getElementById("ia-enviar");
const iaTexto=document.getElementById("ia-texto");
const iaMensajes=document.getElementById("ia-mensajes");

iaBoton.onclick=()=>iaChat.style.display="flex";
iaClose.onclick=()=>iaChat.style.display="none";

iaEnviar.onclick=()=>{
iaMensajes.innerHTML+=`<div>Tú: ${iaTexto.value}</div>`;
iaTexto.value="";
};
