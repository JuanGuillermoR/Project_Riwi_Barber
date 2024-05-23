const apiUrl = 'http://localhost:3000/products';
const options = {
    method: "GET",
    headers: {
        'Content-Type': "application/json"
    }
}
    

export async function showProducts() {
    const sectionProducts = document.querySelector("#products");

    try {
        const response = await fetch(apiUrl, options);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        data.forEach(product => {
            const productCard = `
                <div class="card col-md-4" id="card-products" >
                    <figure id="img-product">
                        <img  src="${product.img}"  style="width: 200px; height:200px;" class="card-img-top" alt="${product.name}">
                    </figure>
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.price}</p>
                        <a href="#" id="btn-add" class="btn btn-primary">Agregar</a>
                    </div>
                </div>
                
            `;
            sectionProducts.innerHTML += productCard;
        });
    } catch (error) {
        console.error('Error fetching and parsing data', error);
    }
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