// src/index.js
// This file is the entry point for the React application.
// It sets up the React root element and renders the App component within the context of the Redux store.
// `createRoot` from 'react-dom/client' is used to create a root DOM node for React, enabling concurrent features.
// The application uses Redux for state management, wrapping the entire <App /> component with <Provider> to pass the Redux store down the component tree.
// `PersistGate` is imported from 'redux-persist/integration/react' to delay the rendering of the app's UI until the persisted state has been retrieved and saved to redux, improving user experience by ensuring they can continue from where they left off.
// The 'bootstrap/dist/css/bootstrap.min.css' import applies Bootstrap styles across the application, providing consistent styling and responsive design features.
// The application is mounted to the 'root' DOM element defined in the HTML structure.

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Store/store'; // Make sure to import persistor
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Create a root.
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> {/* PersistGate wrapping the App */}
      <App />
    </PersistGate>
  </Provider>,
 
);
