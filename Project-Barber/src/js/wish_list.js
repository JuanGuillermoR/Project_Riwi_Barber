const apiUrl = 'http://localhost:3000';
const options = {
    method: "GET",
    headers: {
        'Content-Type': "application/json"
    }
}

async function showWishlist() {
    try {
        const response = await fetch(`${apiUrl}/wishlist`, options);
        if (!response.ok) throw new Error('Network response was not ok');

        const wishlist = await response.json();
        const wishlistSection = document.querySelector("#wishlist");
        wishlistSection.innerHTML = '';

        wishlist.forEach(item => {
            const wishlistItem = `
                <tr id="item-${item.id}">
                <td>
                    <figure id="img-wishlist">
                        <img src="${item.img}" style="width: 100px; height:100px;" class="card-img-top" alt="${item.name}">
                    </figure>
                </td>
                <td>
                    <div class=" d-flex align-items-center justify-content-center td-description">
                        ${item.name} <br>
                        ${item.price}
                    </div>
                </td>
                <td>
                    <div class="td-btn d-flex align-items-center justify-content-center">
                        <button type="button" class="btn btn-primary btn-delete" data-delete-id="${item.id}">Eliminar</button>
                    </div>
                </td>
                </tr>
            `;
            wishlistSection.innerHTML += wishlistItem;
        });

        addDeleteEventListeners();

        const btnDeleteAll = document.getElementById("btn-delete-wish");
        if (wishlist.length === 0) {
            btnDeleteAll.style.display = "none";
        } else {
            btnDeleteAll.style.display = "block";
        }

        btnDeleteAll.addEventListener('click', deleteAllWishlistItems);

    } catch (error) {
        console.error('Error fetching wishlist', error);
    }
}

function addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const itemId = event.target.getAttribute('data-delete-id');
            await deleteWishlistItem(itemId);
        });
    });
}

async function deleteWishlistItem(itemId) {
    try {
        const response = await fetch(`${apiUrl}/wishlist/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Network response was not ok');

        // Remove item from localStorage
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist = wishlist.filter(item => item.id !== parseInt(itemId));
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        // Remove item from DOM
        const itemElement = document.getElementById(`item-${itemId}`);
        if (itemElement) {
            itemElement.remove();
        }
  
        // Refresh wishlist
        showWishlist();

    } catch (error) {
        console.error('Error deleting wishlist item', error);
    }
}

async function deleteAllWishlistItems() {
    try {
        const response = await fetch(`${apiUrl}/wishlist`, options);
        if (!response.ok) throw new Error('Network response was not ok');
        const wishlist = await response.json();

        // Delete each item individually
        const deletePromises = wishlist.map(item => 
            fetch(`${apiUrl}/wishlist/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        );

        await Promise.all(deletePromises);

        // Clear the wishlist in localStorage
        localStorage.removeItem('wishlist');

        // Clear the wishlist in the DOM
        const wishlistSection = document.querySelector("#wishlist");
        wishlistSection.innerHTML = '';

        // Hide the delete all button
        const btnDeleteAll = document.getElementById("btn-delete-wish");
        btnDeleteAll.style.display = "none";

    } catch (error) {
        console.error('Error deleting all wishlist items', error);
    }
}

showWishlist(); // Llamar a showWishlist()