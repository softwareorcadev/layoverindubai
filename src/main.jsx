import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/* Self-hosted fonts — exactly the weights the original page's Google Fonts
   URL requested (Poppins 500/600/700, Inter 400/500/600/700), nothing more.
   Self-hosted rather than CDN: no third-party render-blocking request, no
   FOUT on the hero <h1>, and no Google Fonts GDPR exposure. */
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

/* Font Awesome — pinned to 6.7.2 in package.json. FA 7 dropped
   `fa-vector-square` (the Dubai Frame gallery tile) from its free set.
   Only `solid` and `brands` are imported; the page uses zero fa-regular. */
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import '@fortawesome/fontawesome-free/css/brands.min.css'

import './index.css'
import App from './App.jsx'
import BookingProvider from './context/BookingProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookingProvider>
      <App />
    </BookingProvider>
  </StrictMode>,
)
