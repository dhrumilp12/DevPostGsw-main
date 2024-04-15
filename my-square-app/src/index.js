// src/index.js
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
