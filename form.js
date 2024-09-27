document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const dob = document.getElementById('dob').value;
    const text = document.getElementById('text').value.trim();

    let valid = true;

    // resetear errores 
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('dobError').textContent = '';
    document.getElementById('textError').textContent = '';



    // validaciones de todos los campos
    if (name === '') {
        valid = false;
        document.getElementById('nameError').textContent = 'Ingrese su nombre';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailRegex.test(email)) {
        valid = false;
        document.getElementById('emailError').textContent = 'Ingrese un email válido';
    }

    if (dob === '') {
        valid = false;
        document.getElementById('dobError').textContent = 'Ingrese su fecha de nacimiento';
    } else {
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();

        if (age < 13 || (age === 12 && (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))) {
            valid = false;
            document.getElementById('dobError').textContent = 'Debes tener por lo menos 13 años';
        }
    }

    if (text === '') {
        valid = false;
        document.getElementById('textError').textContent = 'Por favor, escriba un mensaje';
    } else if (text.length > 500) {
        valid = false;
        document.getElementById('textError').textContent = 'El mensaje no debe tener mas de 500 caracteres';
    } else if (text.length < 10) {
        valid = false;
        document.getElementById('textError').textContent = 'El mensaje debe tener al menos 10 caracteres';
    }

    //si pasa todas las validaciones carga el formulario
    if (valid) {
        alert('¡El mensaje se ha envíado con éxito!');
        document.getElementById('registrationForm').reset();
    }

});



//aumenta el contrsate de la pagina
let clickeado = 0;
document.querySelector('.contrast').addEventListener('click', function (event) {
    clickeado = !clickeado
    let navbar = document.querySelector('#navbar-bk');
    let body = document.querySelector('body');
    let btn = document.querySelector('#btn');
    let a = document.querySelectorAll('.nav-link');


    if (clickeado) {

        contact.style.color = "white";

        a.forEach(element => {
            element.classList.remove('nav-black');
        });

        body.classList.add('contrast-body');
        btn.classList.remove('btn');
        btn.classList.remove('btn-primary');
        btn.classList.add('contrast-btn-primary');

        navbar.style.color = 'white';
        navbar.classList.remove('bg-light');
        navbar.classList.remove('navbar-light');
        mavbar.classList.add('contrast-body');



    }
    else {

        contact.style.color = "black";

        body.classList.remove('contrast-body');
        btn.classList.remove('contrast-btn-primary');
        btn.classList.add('btn');
        btn.classList.add('btn-primary');
        navbar.style.color = 'black';
        navbar.classList.add('bg-light');
        navbar.classList.add('navbar-light');
        navbar.classList.remove('contrast-body');

        a.forEach(element => {
            element.classList.add('nav-black');
        });

    }

});