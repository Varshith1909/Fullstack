import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@css/index.css'
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Auth0Provider
    domain="dev-2ere3xom3pqjdylj.us.auth0.com"
    clientId="ehO7yfRcv3iDEShvOINAKBSLToI15fWE"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
)
