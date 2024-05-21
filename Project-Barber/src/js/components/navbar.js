export function navbarComponent(){
    const navbar = document.querySelector("header")

    navbar.innerHTML +=`
      <nav class="navbar navbar-expand-lg bg-secondary fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">New style</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-start" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbar-start">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item"><a href="#" class="nav-link">Sobre nosotros</a></li>
            <li class="nav-item"><a href="#" class="nav-link ">Nuestras Reservas</a></li>
            <li class="nav-item"><a href="./productos.html" class="nav-link ">Productos</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Contactanos</a></li>
            <li class="nav-item"><a href="#" class="btn btn-primary">Agendar citas</a></li>
            
          </ul>
        </div>
      </div>
    </nav>`
   
}

