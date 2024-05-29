export function navbarComponent(){
    const navbar = document.querySelector("header")

    navbar.innerHTML +=`
      <nav class="navbar navbar-expand-lg bg-secondary fixed-top pe-2">
      <div class="container-fluid">
    
      <img class="ms-5" style="width: 90px" src="https://i.ibb.co/z6dbd7L/Logo-Tama-o1.png" alt="Logo de new style">
      
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-start" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbar-start">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item"><a href="/index.html" class="nav-link">Sobre nosotros</a></li>
            <li class="nav-item"><a href="/src/pages/bookings.html" class="nav-link ">Nuestras Reservas</a></li>
            <li class="nav-item"><a href="/src/pages/products.html" class="nav-link ">Productos</a></li>
            <li class="nav-item"><a href="/src/pages/contact.html" class="nav-link">Contactanos</a></li>
            <li class="nav-item"><a href="/src/pages/reservation.html" class="btn btn-primary">Agendar citas</a></li> 
          </ul>
        </div>
      </div>
    </nav>`
   
}

