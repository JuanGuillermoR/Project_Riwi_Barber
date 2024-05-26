// Import our custom CSS
import "../scss/main.scss";
import "../scss/abstracts/_variables.scss";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Import footer
import {navbarComponent} from "./components/navbar";

// Import footer
import { footerComponent } from "./components/footer";

//import products
import { showProducts } from "./productos";

//import customers
import { showCustomers } from "./bookings";


navbarComponent()
footerComponent()

//productos
showProducts()

//customers
showCustomers()

