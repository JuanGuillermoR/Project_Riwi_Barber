const apiUrl = 'http://localhost:3000/customers';
const options = {
    method: "GET",
    headers: {
        'Content-Type': "application/json"
    }
}

function getCustomersFromLocalStorage() {
    const customers = localStorage.getItem('customers');
    return customers ? JSON.parse(customers) : [];
}

// Función para guardar los datos en localStorage
function saveCustomersToLocalStorage(data) {
    localStorage.setItem('customers', JSON.stringify(data));
}


export async function showCustomers() {
    const nameCustomer = document.getElementById("name-customer");
    nameCustomer.textContent = "";
    const customers = document.getElementById("customers-table");
    customers.innerHTML = ""
    try {
        let data = getCustomersFromLocalStorage(); // Obtener los datos de localStorage
        if (data.length === 0) {
            const response = await fetch(apiUrl, options);
            if (!response.ok) throw new Error('Network response was not ok');
    
            data = await response.json();
            saveCustomersToLocalStorage(data); // Guardar los datos en localStorage
        }

        data.forEach(customer => {
            const lastFourDigits = customer.id.slice(-4);
            const customerTable = `
                <tr>
                <td>${customer.name}</td>
                <td>${lastFourDigits}</td>
                <td>${customer.date}</td>
                <td>${customer.time}</td>
                <td>${customer.professional}</td>
                <td>Medellín</td>
                <td>
                    <div class="d-flex justify-content-center gap-3 align-items-center">
                        <div>
                            <i class="bi bi-pencil-fill pencil" data-bs-toggle="modal" data-bs-target="#ModalUpdate" data-customer-id="${customer.id}" onclick="loadCustomerDataForUpdate(event)"></i>
                        </div>
                        <div>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalCancel">Cancelar</button>
                        </div>
                    </div>
                </td>
                </tr>
            `;
            customers.innerHTML += customerTable;
        });
    } catch (error) {
        console.error('Error fetching and parsing data', error);
    }
}

