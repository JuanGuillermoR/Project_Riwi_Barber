const apiUrl = 'http://localhost:3000';
const options = {
    method: "GET",
    headers: {
        'Content-Type': "application/json"
    }
}

export async function showProducts() {
    const sectionProducts = document.querySelector("#products");

    try {
        const response = await fetch(`${apiUrl}/products`, options);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        renderProducts(data);

        // Añadir evento al campo de búsqueda
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', () => filterProducts(data));

    } catch (error) {
        console.error('Error fetching and parsing data', error);
    }
}

function renderProducts(products) {
    const sectionProducts = document.querySelector("#products");
    sectionProducts.innerHTML = '';
    products.forEach(product => {
        const productCard = `
            <div class="card col-md-4" id="card-products">
                <figure class="figure-img">
                    <img src="${product.img}" style="width: 200px; height:200px;" class="card-img-top" alt="${product.name}">
                </figure>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$ ${product.price}</p>
                    <a href="#" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${product.id}" data-name="${product.name}" data-description="${product.description}" data-price="${product.price}" data-img="${product.img}">Ver detalles</a>
                    <br>
                    <a href="#" id="btn-add-${product.id}" class="btn btn-primary btn-add" data-id="${product.id}">Agregar</a>
                </div>
            </div>
        `;
        sectionProducts.innerHTML += productCard;
    });

    // Añadir evento click a los botones de agregar
    const addButtons = document.querySelectorAll(".btn-add");
    addButtons.forEach(button => {
        button.addEventListener("click", addToWishlist);
    });

    // Añadir evento click a los enlaces de Ver detalles
    const detailLinks = document.querySelectorAll('[data-bs-toggle="modal"]');
    detailLinks.forEach(link => {
        link.addEventListener("click", showProductDetails);
    });
}

function filterProducts(products) {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchInput));
    renderProducts(filteredProducts);
}

function showProductDetails(event) {
    const link = event.currentTarget;
    const modalImg = document.getElementById("modal-img");
    const modalName = document.getElementById("modal-name");
    const modalDescription = document.getElementById("modal-description");
    const modalPrice = document.getElementById("modal-price");

    modalImg.src = link.getAttribute("data-img");
    modalImg.alt = link.getAttribute("data-name");
    modalName.textContent = link.getAttribute("data-name");
    modalDescription.textContent = link.getAttribute("data-description");
    modalPrice.textContent = link.getAttribute("data-price");
}

// Función para agregar productos a la lista de deseos
async function addToWishlist(event) {
    event.preventDefault();
    const productId = event.target.getAttribute('data-id');
    const productCard = event.target.closest('.card');
    const productName = productCard.querySelector('.card-title').innerText;
    const productPrice = productCard.querySelector('.card-text').innerText;
    const productImg = productCard.querySelector('img').src;

    const wishlistItem = {
        id: productId,
        name: productName,
        price: productPrice,
        img: productImg
    };

     // Guardar en localStorage
     let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
     wishlist.push(wishlistItem);
     localStorage.setItem('wishlist', JSON.stringify(wishlist));
 
     // Enviar al servidor
     try {
         const response = await fetch(`${apiUrl}/wishlist`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(wishlistItem)
         });
 
         if (!response.ok) throw new Error('Network response was not ok');
         alert(`${productName} ha sido agregado a la lista de deseos.`);
 
     } catch (error) {
         console.error('Error adding product to wishlist', error);
     }
}

// Llamar a showProducts para cargar los productos al iniciar
showProducts();
