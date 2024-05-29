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

function saveCustomersToLocalStorage(data) {
    localStorage.setItem('customers', JSON.stringify(data));
}

let selectedTime = ""
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

let selectBarber = ""

document.querySelectorAll('.prueba').forEach(item => {
    item.addEventListener('click', event => {
        document.querySelectorAll('.btn-light').forEach(btn => {
            btn.classList.remove('selected-barber');
        });
        // Agregar la clase al botón de horario seleccionado
        event.target.classList.add('selected-barber');
        selectBarber = event.target.value;
    });
});

let selectCut = ""

document.querySelectorAll('.type-cut').forEach(item => {
    item.addEventListener('click', event => {
        document.querySelectorAll('.btn-light').forEach(btn => {
            btn.classList.remove('selected-barber');
        });
        // Agregar la clase al botón de horario seleccionado
        event.target.classList.add('selected-barber');
        selectCut = event.target.value;
    });
});

document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();
    // Obtener los valores del formulario
    const customerData = {
        name: document.getElementById('FirstName').value,
        lastName: document.getElementById('SecondName').value,
        documentType: document.getElementById('SelectCC').value,
        id: document.getElementById('document').value,
        contactNumber: document.getElementById('number-contact').value,
        email: document.getElementById('email1').value,
        message: document.getElementById('Textarea2').value,
        date: document.getElementById('fecha').value,
        time: selectedTime,
        professional: selectBarber,
        typeCut: selectCut
    };

    console.log(customerData);
    
    try {
        const response = await fetch(`${apiUrl}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(customerData)
        });
        if (response.ok) {
            let data = getCustomersFromLocalStorage();
            data.push(customerData) 
            saveCustomersToLocalStorage(data);// Guardar los datos actualizados en localStorage
            console.log("Cliente agregado exitosamente");
            window.location.href = '../pages/bookings.html'
        } else {
            console.error("Error al agregar el cliente:", response.status);
        }
    } catch (error) {
        console.error("Error al agregar el cliente:", error);
    }
})
