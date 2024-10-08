const botonConfirmar = document.querySelector('.confirmar');
let accs = document.querySelector("#accs");
let contact = document.querySelector("#contact");
let cloth = document.querySelector("#cloth");
let profile = document.querySelector("#profile");
let supplements = document.querySelector("#supplements");
const ruta = window.location.pathname;
let contador = document.querySelector('.contador');

let carrito = {
    productos: [],
    total: 0,

    agregarProductoCarrito(producto) {
        this.productos.push(producto);
        this.total += producto.precio;
        cargarASeccion(producto);
        this.mostrar();
        this.guardarCarritoLocalStorage();
        chekBotonConfirmar();
    },

    eliminarProductoCarrito(producto) {
        // Encontramos el índice del primer producto que coincide
        const index = this.productos.findIndex(p => p.nombre === producto.nombre);
    
        // Si existe el producto, lo eliminamos
        if (index !== -1) {
            this.total -= this.productos[index].precio; // Restamos el precio
            this.productos.splice(index, 1); 
            this.guardarCarritoLocalStorage(); 
            chekBotonConfirmar();
        }
    },
    

    eliminarCarrito() {
        this.productos = [];
        this.total = 0;
        contador.innerHTML = carrito.productos.length;
    },

    mostrar() {
        let carrito = {
            nombre: 'Carrito de compras',
            productos: this.productos,
            total: this.total,
        };
        console.log(carrito);
    },

    guardarCarritoLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(this));
        if (this.total === 0) {
            localStorage.removeItem('carrito');
        }
    },

    eliminarCarritoLocalStorage() {
        localStorage.removeItem('carrito');
    },

    leerCarritoLocalStorage() {
        const carrito = JSON.parse(localStorage.getItem('carrito'));
        if (carrito) {
            this.productos = carrito.productos;
            this.total = carrito.total;
            this.productos.forEach(producto => {
                cargarASeccion(producto);
            });
            document.querySelector('.total').innerHTML = `Total: $${this.total.toLocaleString()}`;
        } else {
            document.querySelector('.total').innerHTML = '<p class="total">No hay productos seleccionados</p>';
        }
    }

}



function cargarASeccion(producto) {
    const contenedor = document.querySelector('.carrito');
    const item = document.createElement('div');
    item.classList.add('item');
    contador.classList.remove('blue');
    item.innerHTML = `
        <div class="carrito-item">
            <img class="carrito-img" src="${producto.imagen}" alt="${producto.nombre}">
            <div class="carrito-info">
                <p class="nombre">${producto.nombre}</p>
                <h5 class="precio">$${producto.precio.toLocaleString()}</h5>
            </div>         
            <button class="btn btn-danger eliminar" onclick="eliminarProductoCarrito('${producto}')"><img class="basura" src="img/tacho-de-basura.png" alt=""></button>
        </div>
    `;
    document.querySelector('.total').innerHTML = `Total: $${carrito.total.toLocaleString()}`;
    contenedor.appendChild(item);

    const botonEliminar = item.querySelector('.eliminar');
    botonEliminar.addEventListener('click', () => {
        carrito.eliminarProductoCarrito(producto);
        contador.innerHTML = carrito.productos.length;
        item.remove();
        if (carrito.total === 0) {
            document.querySelector('.total').innerHTML = '<p class="total">No hay productos seleccionados</p>';
            contador.classList.add('blue');
        } else {
            document.querySelector('.total').innerHTML = `Total: $${carrito.total.toLocaleString()}`;   
        }
    });

    contador.innerHTML = carrito.productos.length;
}



function cargarSupplements() {
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            const supplements = data.supplements;
            const container = document.querySelector('.supplements');

            supplements.forEach((producto, index) => {
                const card = `
                    <div class="col-sm-12 col-md-4 col-lg-3 card border-primary-subtle" style="width: 18rem;">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.alt}">
                        <div class="card-body">
                            <p class="card-text"><strong>${producto.nombre}</strong></p>
                            <h5 class="card-title">$${producto.precio.toLocaleString()}</h5>
                            <a href="#" class="btn btn-primary agregar-carrito" data-index="${index}">Añadir al carrito</a>
                            <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#modal-${index}">Detalles</button>
                        </div>
                    </div>

                    <!-- Modal -->
                        <div class="modal fade" id="modal-${index}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel-${index}" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header justify-content-between">
                                    <h5 class="modal-title" id="exampleModalLabel">${producto.nombre}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <img src="${producto.imagen}" class="card-img-top p-5" alt="${producto.alt}">
                                <div class="card-body p-5">
                                    <p class="card-text"><strong>${producto.nombre}</strong></p>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">${producto.descripcion}</h6>
                                    <h5 class="card-title">$${producto.precio.toLocaleString()}</h5>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <a href="#" class="btn btn-primary agregar-carrito" data-index="${index}" data-dismiss="modal">Añadir al carrito</a>
                                </div>
                            </div>
                            </div>
                        </div>
                `;
                container.innerHTML += card;
            });

            // Asociar eventos después de generar las tarjetas
            const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
            botonesAgregarCarrito.forEach(boton => {
                boton.addEventListener('click', (e) => {
                    e.preventDefault();  // Evitar el comportamiento por defecto del enlace
                    const index = e.target.dataset.index;
                    carrito.agregarProductoCarrito(supplements[index]);
                });
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}

function cargarCloths() {
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            const cloths = data.cloths;
            const container = document.querySelector('.cloths');

            cloths.forEach((producto, index) => {
                const card = `
                    <div class="col-sm-12 col-md-4 col-lg-3 card border-primary-subtle" style="width: 18rem;">                    
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.alt}">
                        <div class="card-body">
                            <p class="card-text"><strong>${producto.nombre}</strong></p>
                            <h5 class="card-title">$${producto.precio.toLocaleString()}</h5>
                            <a href="#" class="btn btn-primary agregar-carrito" data-index="${index}">Añadir al carrito</a>
                            <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#modal-${index}">Detalles</button>
                        </div>
                    </div>

                    <!-- Modal -->
                        <div class="modal fade" id="modal-${index}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel-${index}" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header justify-content-between">
                                    <h5 class="modal-title" id="exampleModalLabel">${producto.nombre}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <img src="${producto.imagen}" class="card-img-top p-5" alt="${producto.alt}">
                                <div class="card-body p-5">
                                    <p class="card-text"><strong>${producto.nombre}</strong></p>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">${producto.descripcion}</h6>
                                    <h5 class="card-title">$${producto.precio.toLocaleString()}</h5>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <a href="#" class="btn btn-primary agregar-carrito" data-index="${index}" data-dismiss="modal">Añadir al carrito</a>
                                </div>
                            </div>
                            </div>
                        </div>
                `;
                container.innerHTML += card;
            });

            // Asociar eventos después de generar las tarjetas
            const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
            botonesAgregarCarrito.forEach(boton => {
                boton.addEventListener('click', (e) => {
                    e.preventDefault();  // Evitar el comportamiento por defecto del enlace
                    const index = e.target.dataset.index;
                    carrito.agregarProductoCarrito(cloths[index]);
                });
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}

function cargarAccs() {
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            const accs = data.accs;
            const container = document.querySelector('.accs');

            accs.forEach((producto, index) => {
                const card = `
                    <div class="col-sm-12 col-md-4 col-lg-3 card border-primary-subtle" style="width: 18rem;">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.alt}">
                        <div class="card-body">
                            <p class="card-text"><strong>${producto.nombre}</strong></p>
                            <h5 class="card-title">$${producto.precio.toLocaleString()}</h5>
                            <a href="#" class="btn btn-primary agregar-carrito" data-index="${index}">Añadir al carrito</a>
                            
                            <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#modal-${index}">Detalles</button>
                        </div>
                    </div>

                    <!-- Modal -->
                        <div class="modal fade" id="modal-${index}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel-${index}" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header justify-content-between">
                                    <h5 class="modal-title" id="exampleModalLabel">${producto.nombre}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <img src="${producto.imagen}" class="card-img-top p-5" alt="${producto.alt}">
                                <div class="card-body p-5">
                                    <p class="card-text"><strong>${producto.nombre}</strong></p>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">${producto.descripcion}</h6>
                                    <h5 class="card-title">$${producto.precio.toLocaleString()}</h5>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <a href="#" class="btn btn-primary agregar-carrito" data-index="${index}" data-dismiss="modal">Añadir al carrito</a>
                                </div>
                            </div>
                            </div>
                        </div>
                `;
                container.innerHTML += card;
            });

            // Asociar eventos después de generar las tarjetas
            const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
            botonesAgregarCarrito.forEach(boton => {
                boton.addEventListener('click', (e) => {
                    e.preventDefault();  // Evitar el comportamiento por defecto del enlace
                    const index = e.target.dataset.index;
                    carrito.agregarProductoCarrito(accs[index]);
                });
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}

if (ruta.includes('contact')) {
    contact.style.color = "black";
    contact.style.fontWeight = "bold";
} else if (ruta.includes('accs')) {
    cargarAccs();
    carrito.leerCarritoLocalStorage();
    accs.style.color = "black";
    accs.style.fontWeight = "bold";
} else if (ruta.includes('cloth')) {
    cargarCloths();
    carrito.leerCarritoLocalStorage();
    cloth.style.color = "black";
    cloth.style.fontWeight = "bold";
} else if (ruta.includes('profile')) {
    profile.style.color = "black";
    profile.style.fontWeight = "bold";
} else if (ruta.includes('supplements')) {
    cargarSupplements();
    carrito.leerCarritoLocalStorage();
    supplements.style.color = "black";
    supplements.style.fontWeight = "bold";
}



function chekBotonConfirmar() {
    if (carrito.total === 0) {
        botonConfirmar.disabled = true;
    } else {
        botonConfirmar.disabled = false;
    }
};


chekBotonConfirmar();
botonConfirmar.addEventListener('click', () => {
    if (carrito.total === 0) {
        alert('No hay productos en el carrito');
    } else {
        document.querySelector('.carrito').innerHTML = '';
        document.querySelector('.total').innerHTML = '<p class="total">No hay productos seleccionados</p>';
        alert('Compra confirmada, usted debe pagar $' + carrito.total.toLocaleString() + ' por los productos. Le enviaremos un email con los detalles a seguir, gracias por su compra.');
        carrito.eliminarCarrito();
        carrito.guardarCarritoLocalStorage();
        chekBotonConfirmar();
        contador.classList.add('blue');

    }

});








