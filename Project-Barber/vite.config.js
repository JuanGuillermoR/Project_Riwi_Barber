import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        'contact us': 'src/pages/contact.html',
        'reservations': 'src/pages/reservation.html',
        'our bookings': 'src/pages/bookings.html',
        // Add more pages as needed
      },
    },
  },
});