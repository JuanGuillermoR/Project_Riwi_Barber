// Variable global para almacenar el horario seleccionado
let selectedTime = "";

// Event listener para los botones de horario
document.querySelectorAll('.btn-light').forEach(item => {
    item.addEventListener('click', event => {
        // Remover la clase de todos los botones de horario
        document.querySelectorAll('.btn-light').forEach(btn => {
            btn.classList.remove('selected-time');
        });
        // Agregar la clase al botón de horario seleccionado
        event.target.classList.add('selected-time');
        // Actualizar la variable selectedTime
        selectedTime = event.target.value;
    });
});

const apiUrl = 'http://localhost:3000/customers';
const options = {
    method: "GET",
    headers: {
        'Content-Type': "application/json"
    }
}
function getCustomersFromLocalStorage() {
    const customers = localStorage.getItem('customers');
    return customers? JSON.parse(customers) : [];
}


// Función para guardar los datos en localStorage
function saveCustomersToLocalStorage(data) {
    localStorage.setItem('customers', JSON.stringify(data));
}

async function findCustomers() {
    const customers = document.getElementById("customers-table");
    const response = await fetch(apiUrl, options);
    const datasearch = await response.json();
    let nameCustomer = document.getElementById("name-customer").value;
    const foundCustomer = datasearch.find(element => element.name.toLowerCase() === nameCustomer.toLowerCase());
    if (foundCustomer) {
        const lastFourDigits = foundCustomer.id.slice(-4);
        customers.innerHTML = `
                <tr>
                <td>${foundCustomer.name}</td>
                <td>${lastFourDigits}</td>
                <td>${foundCustomer.date}</td>
                <td>${foundCustomer.time}</td>
                <td>${foundCustomer.professional}</td>
                <td>Medellín</td>
                <td>
                    <div class="d-flex justify-content-center gap-3 align-items-center">
                        <div>
                            <i class="bi bi-pencil-fill pencil" data-bs-toggle="modal" data-bs-target="#ModalUpdate"></i>
                        </div>
                        <div>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalCancel">Cancelar</button>
                        </div>
                    </div>
                </td>
                </tr>
        `;
    } else {
        console.log("Cliente no encontrado");
    }
}

function updateTable() {
    const customersTable = document.getElementById("customers-table");
    customersTable.innerHTML = ""; // Limpiar la tabla

    const data = getCustomersFromLocalStorage(); // Obtener los datos actualizados de localStorage

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
        customersTable.innerHTML += customerTable;
    });
}

async function seeCustomers() {
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

async function deleteCustomer() {

    const customerDelete = document.getElementById("confirm-document-delete").value.trim();
    let data = getCustomersFromLocalStorage(); // Obtener los datos de localStorage

    for (let i = 0; i < data.length; i++) {
        if (data[i].id === customerDelete) {
            try {
                const response = await fetch(`${apiUrl}/${customerDelete}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': "application/json"
                    }
                });

                if (response.ok) {
                    data.splice(i, 1); // Eliminar el cliente del array local
                    saveCustomersToLocalStorage(data); // Guardar los datos actualizados en localStorage
                    updateTable();
                    console.log("Cliente eliminado exitosamente");
                } else {
                    console.error("Error al eliminar el cliente:", response.status);
                }
            } catch (error) {
                console.error("Error al eliminar el cliente:", error);
            }
            break;
        }
    }
}

// Función para cargar los datos del cliente en el formulario de actualización
function loadCustomerDataForUpdate(event) {
    const customerId = event.target.dataset.customerId; // Obtener el ID del cliente del botón que inició el modal
    const data = getCustomersFromLocalStorage();
    const customer = data.find(item => item.id === customerId);

    if (customer) {
        document.getElementById("FirstName").value = customer.name;
        document.getElementById("fecha").value = customer.date;
        // document.getElementById("btn-time").value = customer.time;
        document.getElementById("SelectCC").value = customer.professional;
    }
}

// Función para actualizar el cliente en la tabla
function updateCustomerInTable(customerId,updatedData) {
    const customersTable = document.getElementById("customers-table");
    const rows = customersTable.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        
        if (customerId === updatedData.id) {
            cells[0].textContent = updatedData.name;
            cells[2].textContent = updatedData.date;
            cells[4].textContent = updatedData.professional;
            break;
        }
    }
}

// Función para enviar la solicitud de actualización al servidor
async function sendUpdateRequest(customerId, updatedData) {
    try {
        const response = await fetch(`${apiUrl}/${customerId}`, {
            method: "PUT", // Cambiar el método a PUT para actualizar
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            console.log("Cliente actualizado exitosamente");
        } else {
            console.error("Error al actualizar el cliente:", response.status);
            console.log(response);
            console.log(customerId);
            return false;
        }
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        return false;
    }
}


// Función para manejar el evento de actualización del cliente
async function handleUpdate() {
    const customerId = document.getElementById("confirmCC").value.trim();
    const updatedData = {
        name: document.getElementById("FirstName").value.trim(),
        date: document.getElementById("fecha").value.trim(),
        professional: document.getElementById("SelectCC").value.trim(),
        // lastName: lastName,
        // documentType: documentType,
        // contactNumber: contactNumber,
        // email: email,
        // message: email,
        // professional: selectBarber,
        // typeCut: selectCut
    };

    if (selectedTime !== "") {
        // Actualizar el horario en los datos actualizados del cliente
        updatedData.time = selectedTime;

        // Envía la solicitud de actualización al servidor solo si selectedTime no está vacío
        const success = await sendUpdateRequest(customerId, updatedData);

        if (success) {
            // Actualizar la fila en la tabla con los nuevos datos
            updateCustomerInTable(customerId, updatedData);
            
            // Mostrar los cambios en la tabla
            updateTable();
        }
    }
}
