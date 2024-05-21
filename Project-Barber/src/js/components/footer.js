// Footer component

const footer = document.querySelector("footer")

export function footerComponent() {
    footer.innerHTML = `
    <section>
      <figure>
        <img class="ms-5" style="width: 150px" src="https://i.ibb.co/z6dbd7L/Logo-Tama-o1.png" alt="Logo de new style">
      </figure>

      <div class="d-flex justify-content-center gap-4 ms-5">
          <a href="#">
            <i class="bi bi-facebook disabled settings-icons-footer"></i>
          </a>
        <a href="#">
          <i class="bi bi-linkedin disabled settings-icons-footer"></i>
        </a>
        <a href="#">
          <i class="bi bi-youtube disabled settings-icons-footer"></i>
        </a>
        <a href="#">
          <i class="bi bi-instagram disabled settings-icons-footer"></i>
        </a>
      </div>
    </section>

    <section>
      <div class="container text-center text-md-start mt-5">

        <div class="row gap-5">

          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto info-contact-footer me-5">
            <h6 class="text-uppercase fw-bold mb-4">
              Información de contacto
            </h6>
            <p>
              CARRERA 48 #25 AA SUR 70
            </p>
            <p>
              Tel: +57 317 7421964
            </p>
            <p>
              newstyle.barber0705@gmail.com
            </p>
          </div>

          <div class="col-lg-2 col-xl-2 mx-auto info-contact-footer">
            <h6 class="text-uppercase fw-bold mb-4">
              Enlaces
            </h6>
            <p>
              <a href="#!" class="text-reset link-underline link-underline-opacity-0">Página de reservas</a>
            </p>
            <p>
              <a href="#!" class="text-reset link-underline link-underline-opacity-0">Nuestros productos</a>
            </p>
            <p>
              <a href="#!" class="text-reset link-underline link-underline-opacity-0">Lista de deseos</a>
            </p>
          </div>

          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0">
            <h6 class="text-uppercase fw-bold mb-4">Aviso legal y políticas de privacidad</h6>
            <p><i class="fas fa-home"></i>Conoce nuestros términos y condiciones</p>
          </div>

        </div>

      </div>
    </section>
`
}