import Swal from "sweetalert2";

const formContact = document.getElementById("form-contact");

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

function succesAlert() {
  Toast.fire({
    icon: "success",
    title: "Enviado!",
  });
}


formContact.addEventListener("submit", () => {
  succesAlert()
});
