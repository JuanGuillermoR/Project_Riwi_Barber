// Import our custom CSS
import "../scss/main.scss";
import "../scss/abstracts/_variables.scss";

// Import alerts
import { eventListener } from "./alerts";
eventListener()

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Import navbar
import {navbarComponent} from "./components/navbar";
navbarComponent()

// Import footer
import { footerComponent } from "./components/footer";
footerComponent()