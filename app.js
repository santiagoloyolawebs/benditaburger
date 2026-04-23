// --- CONFIGURACIÓN DE MENÚ ESTÁTICO (Sin Base de Datos) ---
const MENU = {
    burgers: [
        { nombre: "Cheese", desc: "Pan brioche, nuestra mayo, medallón de asado 120 gr, doble cheddar.", precio: 13500, img: "assets/logo.png" }, 
        { nombre: "Cheese Bacon", desc: "Pan brioche, nuestra mayo, medallón de asado 120 gr, doble cheddar, panceta crocante.", precio: 14500, img: "assets/cheesebacon.png" },
        { nombre: "Cebolla", desc: "Pan brioche, nuestra mayo, medallón de asado 120 gr, cebolla morada cocida en plancha, panceta crocante, doble cheddar.", precio: 14500, img: "assets/cebolla.png" },
        { nombre: "Histórica", desc: "Pan brioche, nuestra mayo, medallón de asado 120 gr, lechuga, tomate, jamón, queso cremoso.", precio: 14000, img: "assets/historica.png" },
        { nombre: "Provo", desc: "Pan brioche, nuestra mayo, medallón de asado 120 gr, provoleta, salsa criolla.", precio: 15000, img: "assets/provo.png" },
        { nombre: "Santa", desc: "Pan brioche, salsa bendita, panceta crocante, cebolla, lechuga, tomate, medallón de asado 120 gr, doble cheddar.", precio: 15500, img: "assets/santaburger.png" },
        { nombre: "Rucu", desc: "Pan brioche, nuestra mayo, medallón de asado 120 gr, salsa roquefort, rúcula, tomate.", precio: 14500, img: "assets/rucu.png" }
    ]
};

let carrito = [];
// --- NÚMERO DE WHATSAPP ACTUALIZADO ---
const numeroWhatsappGlobal = "543777388036"; 

const contenedorBurgers = document.getElementById('productos-contenedor');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const listaCarrito = document.getElementById('lista-carrito');
const precioTotalDOM = document.getElementById('precio-total');
const cartCounter = document.getElementById('cart-counter');
const btnWhatsApp = document.getElementById('btn-whatsapp');
const inputNotas = document.getElementById('pedido-notas');

// ================= CARGAR MENÚ =================
function cargarMenu() {
    contenedorBurgers.innerHTML = '';
    MENU.burgers.forEach((p, index) => {
        const div = document.createElement('div');
        div.classList.add('product-card');
        
        let imagenUrl = p.img; 
        
        div.innerHTML = `
            <img src="${imagenUrl}" alt="${p.nombre}" class="product-img" onerror="this.src='assets/logo.png'; this.classList.add('img-contain')">
            <div class="product-info">
                <h3 class="product-title">${p.nombre}</h3>
                <p class="product-desc">${p.desc}</p>
                <div class="product-actions">
                    <select id="select-burger-${index}" class="size-selector">
                        <option value="Normal|${p.precio}">Normal - $${p.precio.toLocaleString('es-AR')}</option>
                    </select>
                    <button class="btn-add" onclick="agregarBurger(${index}, event)">Agregar al Pedido</button>
                </div>
            </div>`;
        contenedorBurgers.appendChild(div);
    });
}

function agregarBurger(index, event) {
    animarVuelo(event);
    const p = MENU.burgers[index];
    const selector = document.getElementById(`select-burger-${index}`);
    const valores = selector.value.split('|');
    const precio = parseInt(valores[1]);
    
    carrito.push({ nombre: `${p.nombre}`, precio: precio });
    actualizarCarrito();
    mostrarNotificacion(`¡${p.nombre} agregada!`);
}

function eliminarItem(i) { 
    carrito.splice(i, 1); actualizarCarrito(); 
}

function actualizarCarrito() {
    listaCarrito.innerHTML = ''; 
    let subtotal = 0;
    cartCounter.innerText = carrito.length;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p style="text-align:center; padding: 20px; color:#888;">Tu carrito está vacío.</p>';
        btnWhatsApp.disabled = true;
    } else {
        btnWhatsApp.disabled = false;
        carrito.forEach((item, i) => {
            subtotal += item.precio;
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `<div class="item-details"><h4>${item.nombre}</h4><p>$${item.precio.toLocaleString('es-AR')}</p></div>
                <button class="btn-remove" onclick="eliminarItem(${i})"><i class="fa-solid fa-trash"></i></button>`;
            listaCarrito.appendChild(li);
        });
    }

    precioTotalDOM.innerText = "$" + subtotal.toLocaleString('es-AR');
}

// ================= UI HELPERS =================
function abrirCarrito() { cartSidebar.classList.add('active'); cartOverlay.classList.add('active'); document.body.classList.add('no-scroll'); }
function cerrarCarrito() { cartSidebar.classList.remove('active'); cartOverlay.classList.remove('active'); document.body.classList.remove('no-scroll'); }

function toggleDireccion() {
    const m = document.getElementById('metodo-entrega').value;
    document.getElementById('grupo-direccion').style.display = m === 'Delivery' ? 'block' : 'none';
    actualizarCarrito();
}

function animarVuelo(event) {
    const btnCarrito = document.getElementById('btn-abrir-carrito');
    const coordsCarrito = btnCarrito.getBoundingClientRect();
    const particle = document.createElement('div');
    particle.className = 'flying-item';
    particle.innerHTML = '<i class="fa-solid fa-burger"></i>';
    particle.style.left = `${event.clientX - 20}px`;
    particle.style.top = `${event.clientY - 20}px`;
    document.body.appendChild(particle);
    setTimeout(() => {
        particle.style.left = `${coordsCarrito.left + (coordsCarrito.width / 2) - 20}px`;
        particle.style.top = `${coordsCarrito.top + (coordsCarrito.height / 2) - 20}px`;
        particle.style.transform = 'scale(0.3) rotate(360deg)';
        particle.style.opacity = '0.7';
    }, 50);
    setTimeout(() => {
        particle.remove();
        const btn = document.getElementById('btn-abrir-carrito');
        btn.classList.add('cart-animate');
        setTimeout(() => btn.classList.remove('cart-animate'), 400);
    }, 1200);
}

function mostrarNotificacion(mensaje) {
    const t = document.getElementById('notificacion');
    t.innerText = mensaje; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// ================= WHATSAPP SEND =================
btnWhatsApp.addEventListener('click', () => {
    
    // 👇 ESTO LE AVISA A VERCEL QUE ALGUIEN TOCÓ EL BOTÓN 👇
    if (window.va) {
        window.va('event', 'Clic en Hacer Pedido');
    }

    let subtotal = 0;
    let m = "*NUEVO PEDIDO - BENDITA BURGER*\n\n";
    carrito.forEach(i => { 
        m += `- ${i.nombre}: $${i.precio.toLocaleString('es-AR')}\n`; 
        subtotal += i.precio; 
    });

    const metodoEntrega = document.getElementById('metodo-entrega').value;

    if (metodoEntrega === "Delivery") {
        m += `\n*Dirección:* ${document.getElementById('direccion-envio').value}\n`;
    }

    m += `\n*TOTAL:* $${subtotal.toLocaleString('es-AR')}\n\n`;
    m += `*Pago:* ${document.getElementById('metodo-pago').value}\n`;
    m += `*Modo:* ${metodoEntrega}\n`;
    
    if (inputNotas.value.trim() !== "") m += `*Aclaraciones:* ${inputNotas.value.trim()}`;
    
    window.open(`https://wa.me/${numeroWhatsappGlobal}?text=${encodeURIComponent(m)}`, '_blank');
});

// Inicialización
document.getElementById('btn-abrir-carrito').addEventListener('click', abrirCarrito);
document.getElementById('btn-cerrar-carrito').addEventListener('click', cerrarCarrito);
cartOverlay.addEventListener('click', cerrarCarrito);

cargarMenu();