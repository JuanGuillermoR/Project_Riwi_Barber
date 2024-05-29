const apiUrl = 'http://localhost:3000/products';
const options = {
    method: "GET",
    headers: {
        'Content-Type': "application/json"
    }
}

export async function showProducts(products) {
    const sectionProducts = document.querySelector(".products");
    sectionProducts.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        const productCard = `
            <div class="card col-md-4 card-products" id="card-products" >
                <figure class="figure-img">
                    <img src="${product.img}" style="width: 200px; height:200px;" class="card-img-top" alt="${product.name}">
                </figure>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price}</p>
                    <a href="#">Ver detalles</a>
                    <br>
                    <a href="#" id="btn-add" class="btn btn-primary">Agregar</a>
                </div>
            </div>
        `;
        sectionProducts.innerHTML += productCard;
    });
}



// Llama a la función para mostrar los productos



// export function toShowProducts() {

    

//     apiUrl.forEach(product => {
//         sectionProdcutos.innerHTML+=
//         `
//             <div class="card" style="width: 19rem;">
//                 <img src=${product.img} class="card-img-top" alt="...">
//                 <div class="card-body">
//                 <h5 class="card-title">${product.nombre}</h5>
//                 <p class="card-text">${product.precio}</p>
//                 <a href="#" class="btn btn-primary">Agregar</a>
//                 </div>
//             </div>
//     `
        
//     });
// }