// Import our custom CSS
import "../scss/main.scss";
import "../scss/abstracts/_variables.scss";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
// Import alerts
// import { eventListener } from "./alerts";
// Import footer
import {navbarComponent} from "./components/navbar";

// Import footer
import { footerComponent } from "./components/footer";

//import products
import { showProducts } from "./productos";



navbarComponent()
footerComponent()

//productos
showProducts()
