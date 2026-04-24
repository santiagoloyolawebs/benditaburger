/* ========================================================
   SISTEMA DE PEDIDOS - BENDITA BURGER
   ======================================================== */

// --- 1. BASE DE DATOS ---
const productos = [
    {
        id: 1,
        nombre: "Cheese",
        descripcion: "Pan brioche, nuestra mayo, medallón de asado 120 gr, doble cheddar.",
        precioBase: 13500, 
        categoria: "BURGERS",
        img: "img/logo.png",
        variantes: [
            { nombre: "Simple", precio: 13500 },
            { nombre: "Doble", precio: 15500 },
            { nombre: "Triple", precio: 17500 }
        ],
        extras: [
            { nombre: "Extra Cheddar", precio: 1500 },
            { nombre: "Medallón Adicional", precio: 3500 }
        ],
        removibles: ["Sin Nuestra Mayo"]
    },
    {
        id: 2,
        nombre: "Cheese Bacon",
        descripcion: "Pan brioche, nuestra mayo, medallón de asado 120 gr, doble cheddar, panceta crocante.",
        precioBase: 14500,
        categoria: "BURGERS",
        img: "img/cheesebacon.png",
        variantes: [
            { nombre: "Simple", precio: 14500 },
            { nombre: "Doble", precio: 16500 },
            { nombre: "Triple", precio: 18500 }
        ],
        extras: [
            { nombre: "Extra Cheddar", precio: 1500 },
            { nombre: "Extra Bacon", precio: 2000 },
            { nombre: "Medallón Adicional", precio: 3500 }
        ],
        removibles: ["Sin Nuestra Mayo", "Sin Panceta"]
    },
    {
        id: 3,
        nombre: "Cebolla",
        descripcion: "Pan brioche, nuestra mayo, medallón de asado 120 gr, cebolla morada cocida en plancha, panceta crocante, doble cheddar.",
        precioBase: 14500,
        categoria: "BURGERS",
        img: "img/cebolla.png",
        variantes: [
            { nombre: "Simple", precio: 14500 },
            { nombre: "Doble", precio: 16500 },
            { nombre: "Triple", precio: 18500 }
        ],
        extras: [
            { nombre: "Extra Cheddar", precio: 1500 },
            { nombre: "Extra Bacon", precio: 2000 },
            { nombre: "Medallón Adicional", precio: 3500 }
        ],
        removibles: ["Sin Nuestra Mayo", "Sin Cebolla Morada", "Sin Panceta"]
    },
    {
        id: 4,
        nombre: "Histórica",
        descripcion: "Pan brioche, nuestra mayo, medallón de asado 120 gr, lechuga, tomate, jamón, queso cremoso.",
        precioBase: 14000,
        categoria: "BURGERS",
        img: "img/historica.png",
        variantes: [
            { nombre: "Simple", precio: 14000 },
            { nombre: "Doble", precio: 16000 },
            { nombre: "Triple", precio: 18000 }
        ],
        extras: [
            { nombre: "Extra Queso Cremoso", precio: 1500 },
            { nombre: "Extra Jamón", precio: 1500 },
            { nombre: "Medallón Adicional", precio: 3500 }
        ],
        removibles: ["Sin Nuestra Mayo", "Sin Lechuga", "Sin Tomate", "Sin Jamón"]
    },
    {
        id: 5,
        nombre: "Provo",
        descripcion: "Pan brioche, nuestra mayo, medallón de asado 120 gr, provoleta, salsa criolla.",
        precioBase: 15000,
        categoria: "BURGERS",
        img: "img/provo.png",
        variantes: [
            { nombre: "Simple", precio: 15000 },
            { nombre: "Doble", precio: 17000 },
            { nombre: "Triple", precio: 19000 }
        ],
        extras: [
            { nombre: "Extra Provoleta", precio: 2500 },
            { nombre: "Medallón Adicional", precio: 3500 }
        ],
        removibles: ["Sin Nuestra Mayo", "Sin Salsa Criolla"]
    },
    {
        id: 6,
        nombre: "Santa",
        descripcion: "Pan brioche, salsa bendita, panceta crocante, cebolla, lechuga, tomate, medallón de asado 120 gr, doble cheddar.",
        precioBase: 15500,
        categoria: "BURGERS",
        img: "img/santaburger.png",
        variantes: [
            { nombre: "Simple", precio: 15500 },
            { nombre: "Doble", precio: 17500 },
            { nombre: "Triple", precio: 19500 }
        ],
        extras: [
            { nombre: "Extra Cheddar", precio: 1500 },
            { nombre: "Extra Bacon", precio: 2000 },
            { nombre: "Medallón Adicional", precio: 3500 }
        ],
        removibles: ["Sin Salsa Bendita", "Sin Panceta", "Sin Cebolla", "Sin Lechuga", "Sin Tomate"]
    },
    {
        id: 7,
        nombre: "Rucu",
        descripcion: "Pan brioche, nuestra mayo, medallón de asado 120 gr, salsa roquefort, rúcula, tomate.",
        precioBase: 14500,
        categoria: "BURGERS",
        img: "img/rucu.png",
        variantes: [
            { nombre: "Simple", precio: 14500 },
            { nombre: "Doble", precio: 16500 },
            { nombre: "Triple", precio: 18500 }
        ],
        extras: [
            { nombre: "Extra Roquefort", precio: 2000 },
            { nombre: "Medallón Adicional", precio: 3500 }
        ],
        removibles: ["Sin Nuestra Mayo", "Sin Rúcula", "Sin Tomate"]
    }
];

// --- 2. ESTADO GLOBAL (Sin LocalStorage) ---
const AppState = { 
    carrito: [], 
    productoActual: null, 
    cantidadActual: 1,
    filtroActual: 'TODOS',
    descuentoAplicado: 0 
};

// --- 3. SELECTORES DOM ---
const DOM = {
    grid: document.getElementById('product-grid'),
    filtrosContainer: document.querySelector('.scrollbar-hide'),
    modal: document.getElementById('product-modal'),
    modalWrapper: document.getElementById('modal-content-wrapper'),
    cartOverlay: document.getElementById('cart-overlay'),
    cartDrawer: document.getElementById('cart-drawer'),
    cartItemsContainer: document.getElementById('cart-items-container'),
    mainView: document.getElementById('main-view'),
    checkoutView: document.getElementById('checkout-view'),
    navCartBtn: document.getElementById('nav-cart-btn'),
    navCartQty: document.getElementById('nav-cart-qty'),
    navCartTotal: document.getElementById('nav-cart-total'),
    drawerTotalPrice: document.getElementById('drawer-total-price'),
    checkoutTotalPrice: document.getElementById('checkout-total-price'),
    selLogistica: document.getElementById('chk-logistica'),
    contDireccion: document.getElementById('container-direccion')
};

// --- 4. RENDERIZADO CATÁLOGO ---
function renderizarCatalogo() {
    let productosFiltrados = productos;
    if (AppState.filtroActual !== 'TODOS') {
        productosFiltrados = productos.filter(p => p.categoria === AppState.filtroActual);
    }

    DOM.grid.innerHTML = productosFiltrados.map(prod => {
        const precioAMostrar = prod.variantes ? `Desde $${prod.variantes[0].precio.toLocaleString('es-AR')}` : `$${prod.precioBase.toLocaleString('es-AR')}`;
        const imagenSegura = prod.img && prod.img.trim() !== "" ? prod.img : "img/imagen-card.png";

        return `
        <article class="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition group">
            <div class="relative w-24 h-24 flex-shrink-0">
                <img src="${imagenSegura}" alt="${prod.nombre}" class="w-full h-full object-cover rounded-lg group-hover:scale-105 transition duration-300 bg-gray-100">
            </div>
            <div class="flex-1">
                <h3 class="font-black text-base leading-tight mb-0.5">${prod.nombre}</h3>
                <p class="text-gray-500 text-[11px] mb-2 line-clamp-2 leading-tight">${prod.descripcion}</p>
                <div class="font-black text-lg text-brand-black">${precioAMostrar}</div>
            </div>
            <button onclick="abrirModal(${prod.id})" class="w-9 h-9 bg-brand-red text-white rounded-full flex items-center justify-center font-bold text-base hover:bg-red-600 transition shadow-sm transform group-hover:scale-110">
                <i class="fa-solid fa-plus"></i>
            </button>
        </article>
        `;
    }).join('');

    if(productosFiltrados.length === 0) DOM.grid.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10 text-sm">No hay productos en esta categoría.</p>`;
}

function inicializarFiltros() {
    const botonesFiltro = DOM.filtrosContainer.querySelectorAll('button');
    botonesFiltro.forEach(btn => {
        btn.addEventListener('click', (e) => {
            botonesFiltro.forEach(b => b.className = "bg-white text-gray-600 font-bold text-sm px-5 py-1.5 rounded-full whitespace-nowrap border hover:border-brand-red hover:text-brand-black transition-colors");
            e.target.className = "bg-brand-red text-white font-bold text-sm px-5 py-1.5 rounded-full whitespace-nowrap shadow-sm transition-colors";
            AppState.filtroActual = e.target.textContent.trim();
            renderizarCatalogo();
        });
    });
}

// --- 5. LÓGICA DEL MODAL ---
window.abrirModal = function(id) {
    const p = productos.find(x => x.id === id);
    AppState.productoActual = p; AppState.cantidadActual = 1;

    const imagenSegura = p.img && p.img.trim() !== "" ? p.img : "img/imagen-card.png";
    document.getElementById('modal-img').src = imagenSegura;
    
    document.getElementById('modal-title').textContent = p.nombre;
    document.getElementById('modal-desc').textContent = p.descripcion;
    document.getElementById('modal-qty').textContent = "1";

    const varCont = document.getElementById('modal-variants-container');
    const varList = document.getElementById('modal-variants-list');
    
    if(p.variantes && p.variantes.length > 0) {
        varCont.style.display = 'block';
        varList.innerHTML = p.variantes.map((v, index) => `
            <label class="flex-1 text-center bg-gray-50 p-1.5 rounded-lg border border-transparent cursor-pointer transition-colors relative">
                <input type="radio" name="variante" class="radio-variante absolute opacity-0" value="${v.precio}" data-nombre="${v.nombre}" ${index === 0 ? 'checked' : ''}>
                <div class="variant-box font-bold text-xs text-gray-600 p-1.5 border-2 border-transparent rounded-md transition-colors">${v.nombre}</div>
            </label>
        `).join('');

        document.querySelectorAll('.radio-variante').forEach(radio => {
            radio.addEventListener('change', (e) => {
                document.querySelectorAll('.variant-box').forEach(box => {
                    box.classList.remove('border-brand-red', 'text-brand-black');
                    box.classList.add('border-transparent', 'text-gray-600');
                });
                e.target.nextElementSibling.classList.remove('border-transparent', 'text-gray-600');
                e.target.nextElementSibling.classList.add('border-brand-red', 'text-brand-black');
                actualizarPrecioModal();
            });
            if(radio.checked) {
                radio.nextElementSibling.classList.remove('border-transparent', 'text-gray-600');
                radio.nextElementSibling.classList.add('border-brand-red', 'text-brand-black');
            }
        });
    } else {
        varCont.style.display = 'none';
    }

    const exList = document.getElementById('modal-extras-list');
    const exCont = document.getElementById('modal-extras-container');
    if(p.extras && p.extras.length > 0) {
        exCont.style.display = 'block';
        exList.innerHTML = p.extras.map(e => `
            <label class="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg border border-transparent hover:border-gray-200 cursor-pointer transition-colors">
                <div class="flex items-center space-x-2"><input type="checkbox" class="cb-extra w-4 h-4 accent-brand-red" data-precio="${e.precio}" data-nombre="${e.nombre}"><span class="text-xs font-semibold">${e.nombre}</span></div>
                <span class="text-xs font-bold text-gray-600">+$${e.precio.toLocaleString('es-AR')}</span>
            </label>`).join('');
    } else exCont.style.display = 'none';

    const remList = document.getElementById('modal-removables-list');
    const remCont = document.getElementById('modal-removables-container');
    if(p.removibles && p.removibles.length > 0) {
        remCont.style.display = 'block';
        remList.innerHTML = p.removibles.map(r => `
            <label class="flex items-center space-x-2 bg-gray-50 p-2.5 rounded-lg border border-transparent hover:border-gray-200 cursor-pointer transition-colors">
                <input type="checkbox" class="cb-removible w-4 h-4 accent-brand-black" data-nombre="${r}"><span class="text-xs font-semibold">${r}</span>
            </label>`).join('');
    } else remCont.style.display = 'none';

    actualizarPrecioModal();
    document.querySelectorAll('.cb-extra').forEach(c => c.addEventListener('change', actualizarPrecioModal));

    DOM.modal.classList.remove('hidden'); 
    document.body.classList.add('overflow-hidden');
    setTimeout(() => { DOM.modal.classList.add('opacity-100'); DOM.modalWrapper.classList.remove('scale-95'); }, 10);
};

function cerrarModal() {
    DOM.modal.classList.remove('opacity-100'); DOM.modalWrapper.classList.add('scale-95');
    setTimeout(() => { 
        DOM.modal.classList.add('hidden'); 
        document.body.classList.remove('overflow-hidden'); 
    }, 300);
}

function actualizarPrecioModal() {
    let precioDinamico = AppState.productoActual.precioBase;
    const varSel = document.querySelector('.radio-variante:checked');
    if(varSel) { precioDinamico = parseInt(varSel.value); }

    document.querySelectorAll('.cb-extra:checked').forEach(c => precioDinamico += parseInt(c.dataset.precio));
    document.getElementById('modal-total-price').textContent = (precioDinamico * AppState.cantidadActual).toLocaleString('es-AR');
}

document.getElementById('btn-qty-plus').addEventListener('click', () => { AppState.cantidadActual++; document.getElementById('modal-qty').textContent = AppState.cantidadActual; actualizarPrecioModal(); });
document.getElementById('btn-qty-minus').addEventListener('click', () => { if(AppState.cantidadActual > 1) { AppState.cantidadActual--; document.getElementById('modal-qty').textContent = AppState.cantidadActual; actualizarPrecioModal(); }});

// --- 6. GESTIÓN DEL CARRITO Y ANIMACIÓN ---
document.getElementById('btn-add-to-cart').addEventListener('click', () => {
    const exs = Array.from(document.querySelectorAll('.cb-extra:checked')).map(c => ({ nombre: c.dataset.nombre, precio: parseInt(c.dataset.precio) }));
    const rems = Array.from(document.querySelectorAll('.cb-removible:checked')).map(c => c.dataset.nombre);
    const costExs = exs.reduce((a, b) => a + b.precio, 0);

    let nombreFinal = AppState.productoActual.nombre;
    let precioVariante = AppState.productoActual.precioBase;
    const varSel = document.querySelector('.radio-variante:checked');
    
    if(varSel) {
        nombreFinal = `${AppState.productoActual.nombre} (${varSel.dataset.nombre})`;
        precioVariante = parseInt(varSel.value);
    }
    
    const imagenSegura = AppState.productoActual.img && AppState.productoActual.img.trim() !== "" ? AppState.productoActual.img : "img/imagen-card.png";

    // --- ANIMACIÓN "FLY TO CART" CON ICONO LENTO ---
    const cartBtn = document.getElementById('nav-cart-btn');
    const addBtn = document.getElementById('btn-add-to-cart'); 
    
    if (addBtn && cartBtn) {
        const btnRect = addBtn.getBoundingClientRect();
        const cartRect = cartBtn.getBoundingClientRect();
        
        const flyingIcon = document.createElement('div');
        flyingIcon.innerHTML = '<i class="fa-solid fa-burger"></i>';
        flyingIcon.className = 'flying-item'; 
        
        flyingIcon.style.left = `${btnRect.left + (btnRect.width / 2) - 15}px`;
        flyingIcon.style.top = `${btnRect.top + (btnRect.height / 2) - 15}px`;
        
        document.body.appendChild(flyingIcon);
        void flyingIcon.offsetWidth;
        
        flyingIcon.style.left = `${cartRect.left + (cartRect.width / 2) - 15}px`;
        flyingIcon.style.top = `${cartRect.top + (cartRect.height / 2) - 15}px`;
        flyingIcon.style.opacity = '0';
        flyingIcon.style.transform = 'scale(0.3) rotate(360deg)'; 
        
        setTimeout(() => {
            flyingIcon.remove();
            cartBtn.classList.add('cart-pop');
            setTimeout(() => { cartBtn.classList.remove('cart-pop'); }, 800);
        }, 1200);
    }

    AppState.carrito.push({
        idUnico: Date.now().toString(), 
        productoOriginalId: AppState.productoActual.id,
        nombreMostrar: nombreFinal, 
        imagen: imagenSegura,
        cantidad: AppState.cantidadActual,
        extras: exs, removibles: rems, 
        precioTotal: (precioVariante + costExs) * AppState.cantidadActual
    });
    
    cerrarModal(); 
    actualizarCarritoUI(); 
});

function actualizarCarritoUI() {
    let tP = 0, tI = 0;
    if (AppState.carrito.length === 0) {
        DOM.cartItemsContainer.innerHTML = `<div class="flex flex-col items-center justify-center h-full text-gray-400 opacity-70 mt-5"><i class="fa-solid fa-basket-shopping text-5xl mb-3"></i><p class="font-bold text-sm">Carrito vacío</p></div>`;
        document.getElementById('btn-goto-checkout').classList.add('hidden');
    } else {
        document.getElementById('btn-goto-checkout').classList.remove('hidden');
        DOM.cartItemsContainer.innerHTML = AppState.carrito.map(i => {
            tP += i.precioTotal; tI += i.cantidad;
            return `
            <div class="flex items-start gap-3 bg-white p-3 rounded-lg border relative pr-8 shadow-sm">
                <img src="${i.imagen}" class="w-12 h-12 object-cover rounded-md bg-gray-100">
                <div class="flex-1">
                    <h4 class="font-black text-xs leading-tight text-brand-black">${i.cantidad}x ${i.nombreMostrar}</h4>
                    ${i.extras.length ? `<p class="text-[10px] text-green-600 font-bold mt-0.5">+ ${i.extras.map(e=>e.nombre).join(', ')}</p>` : ''}
                    ${i.removibles.length ? `<p class="text-[10px] text-red-500 font-bold mt-0.5">- ${i.removibles.join(', ')}</p>` : ''}
                    <div class="font-black mt-1 text-sm text-brand-black">$${i.precioTotal.toLocaleString('es-AR')}</div>
                </div>
                <button onclick="eliminarDelCarrito('${i.idUnico}')" class="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors"><i class="fa-solid fa-trash-can text-base"></i></button>
            </div>`;
        }).join('');
    }
    
    const s = tP.toLocaleString('es-AR'); 
    DOM.navCartQty.textContent = tI; DOM.navCartTotal.textContent = s;
    DOM.drawerTotalPrice.textContent = s; DOM.checkoutTotalPrice.textContent = s;
}

window.eliminarDelCarrito = (id) => { AppState.carrito = AppState.carrito.filter(x => x.idUnico !== id); actualizarCarritoUI(); };

function abrirCarrito() { 
    DOM.cartOverlay.classList.remove('hidden'); 
    document.body.classList.add('overflow-hidden'); 
    setTimeout(() => { DOM.cartOverlay.classList.add('opacity-100'); DOM.cartDrawer.classList.remove('translate-x-full'); }, 10); 
}

function cerrarCarrito() { 
    DOM.cartOverlay.classList.remove('opacity-100'); DOM.cartDrawer.classList.add('translate-x-full'); 
    setTimeout(() => { 
        DOM.cartOverlay.classList.add('hidden'); 
        document.body.classList.remove('overflow-hidden'); 
    }, 300); 
}

// --- 7. CHECKOUT Y WHATSAPP ---
document.getElementById('btn-goto-checkout').addEventListener('click', () => { 
    cerrarCarrito(); 
    DOM.mainView.classList.add('hidden'); 
    DOM.checkoutView.classList.remove('hidden'); 
    DOM.navCartBtn.classList.add('hidden'); 
    window.scrollTo(0,0); 
    renderizarCheckoutItems(); 
});

document.getElementById('btn-back-menu').addEventListener('click', () => { 
    DOM.checkoutView.classList.add('hidden'); 
    DOM.mainView.classList.remove('hidden'); 
    DOM.navCartBtn.classList.remove('hidden'); 
});

function renderizarCheckoutItems() {
    document.getElementById('checkout-items').innerHTML = AppState.carrito.map(i => `
        <div class="flex justify-between items-start border-b border-gray-100 pb-2 last:border-0 last:pb-0">
            <div class="flex-1 pr-3">
                <span class="font-black text-sm text-brand-black">${i.cantidad}x ${i.nombreMostrar}</span>
                ${i.extras.length ? `<div class="text-[10px] text-gray-500 font-semibold">+ ${i.extras.map(e=>e.nombre).join(', ')}</div>` : ''}
                ${i.removibles.length ? `<div class="text-[10px] text-gray-500 font-semibold">- ${i.removibles.join(', ')}</div>` : ''}
            </div>
            <span class="font-black text-sm text-brand-black">$${i.precioTotal.toLocaleString('es-AR')}</span>
        </div>`).join('');
}

// Lógica de mostrar u ocultar la dirección
DOM.selLogistica.addEventListener('change', (e) => {
    if(e.target.value === 'envio_domicilio') {
        DOM.contDireccion.classList.remove('hidden');
    } else {
        DOM.contDireccion.classList.add('hidden');
        document.getElementById('chk-direccion').value = ""; // Limpiar el campo si cambia a retiro
    }
});

// Validación y envío de WhatsApp
document.getElementById('btn-confirm-whatsapp').addEventListener('click', () => {
    // Referencias a los inputs
    const elNombre = document.getElementById('chk-nombre');
    const elCelular = document.getElementById('chk-celular');
    const elDni = document.getElementById('chk-dni');
    const elDireccion = document.getElementById('chk-direccion');
    
    const nombre = elNombre.value.trim();
    const celular = elCelular.value.trim();
    const dni = elDni.value.trim();
    const direccion = elDireccion.value.trim();
    
    const logisticaVal = DOM.selLogistica.value;
    const metodoPago = document.getElementById('chk-pago').value;

    // Resetear estados de error previos
    const camposParaValidar = [elNombre, elCelular, elDni, elDireccion];
    camposParaValidar.forEach(el => {
        el.classList.remove('border-red-500', 'bg-red-50', 'ring-2', 'ring-red-500', 'shake');
        const errorText = document.getElementById('err-' + el.id.split('-')[1]);
        if(errorText) errorText.classList.add('hidden');
    });

    let formularioValido = true;

    // Función interna para marcar el error
    const marcarError = (el) => {
        el.classList.add('border-red-500', 'bg-red-50', 'ring-2', 'ring-red-500', 'shake');
        const errorText = document.getElementById('err-' + el.id.split('-')[1]);
        if(errorText) errorText.classList.remove('hidden');
        formularioValido = false;
    };

    // Validar requeridos
    if(!nombre) marcarError(elNombre);
    if(!celular) marcarError(elCelular);
    if(!dni) marcarError(elDni);
    if(logisticaVal === 'envio_domicilio' && !direccion) marcarError(elDireccion);

    // Si hay errores, frenar ejecución y limpiar la clase 'shake' para poder volver a animar si hace clic de nuevo
    if(!formularioValido) {
        setTimeout(() => {
            camposParaValidar.forEach(el => el.classList.remove('shake'));
        }, 500); // 500ms es lo que dura la animación CSS
        return; 
    }

    // Armado del mensaje si todo está OK
    let stringPedido = "";
    AppState.carrito.forEach(i => {
        stringPedido += `%0A🍔 ${i.cantidad}x ${i.nombreMostrar}`;
        if(i.extras.length) stringPedido += `%0A   ↳ Extras: ${i.extras.map(e=>e.nombre).join(', ')}`;
        if(i.removibles.length) stringPedido += `%0A   ↳ Quitar: ${i.removibles.join(', ')}`;
    });

    let logisticaText = logisticaVal === 'envio_domicilio' ? `Envío a Domicilio (${direccion})` : 'Retiro por el Local';

    const msg = `¡Hola! Mi nombre es ${nombre}.%0A(Cel: ${celular} - DNI: ${dni})%0A%0A*Mi Pedido:*${stringPedido}%0A%0A*Total:* $${DOM.checkoutTotalPrice.textContent}%0A*Pago:* ${metodoPago}%0A*Entrega:* ${logisticaText}%0A*Notas:* ${document.getElementById('chk-notas').value || 'Ninguna'}`;
    
    AppState.carrito = []; // Limpia el carrito en memoria antes de recargar
    window.open(`https://wa.me/541122454518?text=${msg}`, '_blank');
    location.reload(); 
});

// --- 8. INICIALIZACIÓN ---
document.getElementById('nav-cart-btn').addEventListener('click', abrirCarrito);
document.getElementById('btn-close-cart').addEventListener('click', cerrarCarrito);
document.getElementById('cart-overlay').addEventListener('click', cerrarCarrito);
document.getElementById('btn-close-modal').addEventListener('click', cerrarModal);
document.getElementById('btn-continue-shopping').addEventListener('click', cerrarCarrito);
document.addEventListener('DOMContentLoaded', () => { inicializarFiltros(); renderizarCatalogo(); actualizarCarritoUI(); });