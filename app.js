const botonConfirmar = document.querySelector('.confirmar');
let accs = document.querySelector("#accs");
let contact = document.querySelector("#contact");
let cloth = document.querySelector("#cloth");
let profile = document.querySelector("#profile");
let supplements = document.querySelector("#supplements");
const ruta = window.location.pathname;

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
        this.productos = this.productos.filter(p => p.nombre !== producto.nombre);
        this.total -= producto.precio;
        this.guardarCarritoLocalStorage();
        chekBotonConfirmar();
    },

    eliminarCarrito() {
        this.productos = [];
        this.total = 0;
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
            document.querySelector('.total').innerHTML = '<p class="total">There are not prodcuts</p>';
        }
    }

}

function cargarASeccion(producto) {
    const contenedor = document.querySelector('.carrito');
    const item = document.createElement('div');
    item.classList.add('item');
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
        item.remove();
        if (carrito.total === 0) {
            document.querySelector('.total').innerHTML = '<p class="total">There are not prodcuts</p>';
        } else {
            document.querySelector('.total').innerHTML = `Total: $${carrito.total.toLocaleString()}`;
        }
    });
}





function cargarSupplements() {
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            const supplements = data.supplements;
            const container = document.querySelector('.supplements');

            supplements.forEach((producto, index) => {
                const card = `
                    <div class="col-sm-10 col-md-4 col-lg-3 card border-primary-subtle mt-3 ms-5" style="width: 18rem;">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.alt}">
                        <div class="card-body">
                            <p class="card-text"><strong>${producto.nombre}</strong></p>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${producto.descripcion}</h6>
                            <h5 class="card-title">$${producto.precio.toLocaleString()}</h5>
                            <a href="#" class="btn btn-primary agregar-carrito" data-index="${index}">Add to Cart</a>
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
                    <div class="col-sm-10 col-md-4 col-lg-3 card border-primary-subtle mt-3 ms-5" style="width: 18rem;">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.alt}">
                        <div class="card-body">
                            <p class="card-text"><strong>${producto.nombre}</strong></p>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${producto.descripcion}</h6>
                            <h5 class="card-title">$${producto.precio.toLocaleString()}</h5>
                            <a href="#" class="btn btn-primary agregar-carrito" data-index="${index}">Add to Cart</a>
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
                    <div class="col-sm-10 col-md-4 col-lg-3 card border-primary-subtle mt-3 ms-5" style="width: 18rem;">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.alt}">
                        <div class="card-body">
                            <p class="card-text"><strong>${producto.nombre}</strong></p>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${producto.descripcion}</h6>
                            <h5 class="card-title
                            ">$${producto.precio.toLocaleString()}</h5>
                            <a href="#" class="btn btn-primary agregar-carrito" data-index="${index}">Add to Cart</a>
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
        document.querySelector('.total').innerHTML = '<p class="total">There are not prodcuts</p>';
        alert('Compra confirmada, usted debe pagar $' + carrito.total.toLocaleString() + ' por los productos. Le enviaremos un email con los detalles a seguir, gracias por su compra.');
        carrito.eliminarCarrito();
        carrito.guardarCarritoLocalStorage();
        chekBotonConfirmar();
    }

});








