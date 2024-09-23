
let accs = document.querySelector("#accs");
let contact = document.querySelector("#contact");
let cloth = document.querySelector("#cloth");
let profile = document.querySelector("#profile");
let supplements = document.querySelector("#supplements");

const ruta = window.location.pathname;
// Obtener la ruta del archivo HTML actual
if (ruta.includes('contact')) {

    contact.style.color = "black";
    contact.style.fontWeight = "bold";
} else if (ruta.includes('accs')) {

    accs.style.color = "black";
    accs.style.fontWeight = "bold";
} else if (ruta.includes('cloth')) {

    cloth.style.color = "black";
    cloth.style.fontWeight = "bold";
} else if (ruta.includes('profile')) {

    profile.style.color = "black";
    profile.style.fontWeight = "bold";
} else if (ruta.includes('supplements')) {

    supplements.style.color = "black";
    supplements.style.fontWeight = "bold";
}




// cloths
fetch('items.json')
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        console.log(data);
        const cloths = data.cloths;
        const container = document.querySelector('.cloths');

        // generar las tarjetas
        cloths.forEach(producto => {
            const card = `
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="card">        
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body px-4">
                            <h6 class="card-title fw-bold text-secondary">${producto.nombre}</h6>
                            <span class="precio fs-3 fw-bold">$ ${producto.precio}</span>
                            <p class="card-text text-black-50">${producto.cuotas}</p>
                            <div class="cont-btn d-flex justify-content-center">
                                <a href="${producto.link}" class="btn btn-primary m-auto fw-bold">Agregar al carrito</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            container.innerHTML += card; // Agregar la tarjeta al contenedor
        });
    }).catch(error => console.error('Error al cargar el JSON:', error));



// supplements
fetch('items.json')
    .then(response => response.json())
    .then(data => {
        const supplements = data.supplements;
        const container = document.querySelector('.supplements');


        supplements.forEach(producto => {
            const card = `
                <div class="col-sm-10 col-md-4 col-lg-3 card border-primary-subtle mt-3 ms-5" style="width: 18rem;">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.alt}">
                    <div class="card-body">
                        <p class="card-text"><strong>${producto.nombre}</strong></p>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${producto.descripcion}</h6>
                        <h5 class="card-title">$${producto.precio.toLocaleString()}</h5>
                        <a href="#" class="btn btn-primary">Añadir al carrito</a>
                    </div>
                </div>
                `;
            container.innerHTML += card;
        });
    }).catch(error => console.error('Error al cargar el JSON:', error));


// accs
fetch('items.json')
    .then(response => response.json())
    .then(data => {
        const accs = data.accs;
        const container = document.querySelector('.accs');
        accs.forEach(producto => {
            const card = `
                <div class="col-sm-10 col-md-4 col-lg-3 card border-primary-subtle mt-3 ms-5" style="width: 18rem;">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.alt}">
                    <div class="card-body">
                        <p class="card-text"><strong>${producto.nombre}</strong></p>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${producto.descripcion}</h6>
                        <h5 class="card-title">$${producto.precio.toLocaleString()}</h5>
                        <a href="#" class="btn btn-primary">Añadir al carrito</a>
                    </div>
                </div>
                `;
            container.innerHTML += card;
        });
    }).catch(error => console.error('Error al cargar el JSON:', error));
