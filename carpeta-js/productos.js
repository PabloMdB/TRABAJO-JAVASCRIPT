//Carga la visual de productos al ingresar a la pagina
document.addEventListener('DOMContentLoaded', function () {
    // Verifica si ya existe "productos" en el sessionStorage
    if (!sessionStorage.getItem('productos')) {
        //Crea el arreglo para los productos
        //El listado de productos cuenta con algunos básicos para que no comience vacío
        let productos = [
            {
                id: 0,
                nombre: 'Fender telecaster',
                imagen: '../images/productos/fender-telecaster-natural.jpg',
                descripcion: 'color madera',
                categoria: 'fender'
            },
            {
                id: 1,
                nombre: 'Gibson les paul',
                imagen: '../images/productos/gibson-les-paul.jpg',
                descripcion: 'Color madera',
                categoria: 'gibson'
            },
            {
                id: 2,
                nombre: 'gibson Sg',
                imagen: '../images/productos/gibson-special-sg-worn-brown.jpg',
                descripcion: 'guitarra color roja',
                categoria: 'gibson'
            },
            {
                id: 3,
                nombre: 'Telecaster Dr',
                imagen: '../images/productos/heritage-h-535-semi-hollow.jpg',
                descripcion: 'Guitarra color bordo',
                categoria: 'telecaster'
            },
            {
                id: 4,
                nombre: 'Fender Br',
                imagen: '../images/productos/jackson-dinky.jpg',
                descripcion: 'Guitarra negra',
                categoria: 'fender'
            },
            {
                id: 5,
                nombre: 'fender Mayer',
                imagen: '../images/productos/prs-john-mayer-strat2.jpg',
                descripcion: 'guitarra con estuche',
                categoria: 'fender'
            },
            {
                id: 6,
                nombre: 'fender heritage',
                imagen: '../images/productos/heritage-standard-eagle-classic-hollow.jpg',
                descripcion: 'Guitarra hueca color madera',
                categoria: 'fender'
            },
        ];

        let productosString = JSON.stringify(productos);
        sessionStorage.setItem('productos', productosString);
    }
    actualizaListaProductos();
    if (sessionStorage.getItem('login')) {
        let userString = sessionStorage.getItem('login');
        let userDatos = JSON.parse(userString);
        let navInventario = document.getElementById('navInventario');
        navInventario.innerHTML = '<a class="nav-link m-3 p-2 border border-dark rounded bg-warning" href="inventario.html">Inventario</a>';
        let navNombre = document.getElementById('navLog');
        navNombre.innerHTML = '<h6 class="m-2">'+userDatos.nombre+'</h6><button class="btn btn-outline-warning" id="salirBtn">Exit</button>';
        //Salir
        let salirBtn = document.getElementById('salirBtn');
        salirBtn.addEventListener('click', function() {
            sessionStorage.removeItem('login');
            window.location.href = "../carpeta-html/inicio.html";
        });
    }else{
        let navInventario = document.getElementById('navInventario');
        navInventario.innerHTML = '';
        let navNombre = document.getElementById('navLog');
        navNombre.innerHTML = '<a class="btn " href="login.html">Ingresar</a>';
    }
});

//Actualiza lista productos para la vista de todos
function actualizaListaProductos() {
    let productosString = sessionStorage.getItem('productos');
    let productosDatos = JSON.parse(productosString);

    let listaProductosDiv = document.getElementById('listaProductos');
    //vacía el listado para generarlo nuevamente
    listaProductosDiv.innerHTML = '';

    let categorias = {};
    //Genera el listado de categorías que hay en los productos
    productosDatos.forEach(function (producto) {
        if (!categorias[producto.categoria]) {
            categorias[producto.categoria] = [];
        }
        categorias[producto.categoria].push(producto);
    });

    //Genera el div de cada categoría con los productos que contiene cada una
    for (let categoria in categorias) {
        let categoriaDiv = document.createElement('div');
        categoriaDiv.id = categoria;

        let h6 = document.createElement('h6');
        h6.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
        categoriaDiv.appendChild(h6);

        let ul = document.createElement('ul');
        ul.classList.add('list-group');
        categoriaDiv.appendChild(ul);

        categorias[categoria].forEach(function (producto) {
            let li = document.createElement('li');
            li.classList.add('list-group-item');
            ul.appendChild(li);

            let rowDiv = document.createElement('div');
            rowDiv.classList.add('row', 'g-0');
            li.appendChild(rowDiv);

            let colImgDiv = document.createElement('div');
            colImgDiv.classList.add('col-md-4', 'd-md-flex', 'align-items-center');
            rowDiv.appendChild(colImgDiv);

            let img = document.createElement('img');
            img.src = producto.imagen;
            img.classList.add('img-fluid', 'rounded-start', 'imagen-listado');
            img.alt = 'imagen-producto';
            colImgDiv.appendChild(img);

            let colContentDiv = document.createElement('div');
            colContentDiv.classList.add('col-md-8');
            rowDiv.appendChild(colContentDiv);

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            colContentDiv.appendChild(cardBody);

            let h5 = document.createElement('h5');
            h5.classList.add('card-title');
            h5.textContent = producto.nombre;
            cardBody.appendChild(h5);

            let p = document.createElement('p');
            p.classList.add('card-text');
            p.textContent = producto.descripcion;
            cardBody.appendChild(p);
        });

        listaProductosDiv.appendChild(categoriaDiv);
    }
}

//Filtra productos por categorías
document.getElementById('mostrarProductosCategoria').addEventListener('change', function () {
    var select = document.getElementById('mostrarProductosCategoria');
    var categoriaSeleccionada = select.value;

    var divGibson = document.getElementById('gibson');
    var divFender = document.getElementById('fender');
    var divTelecaster = document.getElementById('telecaster');

    //Muestra u oculta las categorías según la opción seleccionada
    if (categoriaSeleccionada === 'todos') {
        if(divGibson){
            divGibson.classList.remove('d-none');
        }
        if(divFender){
            divFender.classList.remove('d-none');
        }
        if(divTelecaster){
            divTelecaster.classList.remove('d-none');
        }
    } else {
        if(divGibson){
            divGibson.classList.toggle('d-none', categoriaSeleccionada !== 'gibson');
        }
        if(divFender){
            divFender.classList.toggle('d-none', categoriaSeleccionada !== 'fender');
        }
        if(divTelecaster){
            divTelecaster.classList.toggle('d-none', categoriaSeleccionada !== 'telecaster');
        }
    }
});