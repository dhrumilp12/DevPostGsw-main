// src/store/store.js
// This file configures the Redux store with middleware and persist capabilities. 
// `redux-thunk` is used as middleware for handling asynchronous actions. 
// `redux-persist` is integrated to persist the store in local storage, ensuring that application state persists across sessions.
// `composeEnhancers` is used for integrating the Redux DevTools extension for easier state debugging.
// The store is created with a root reducer combined from various feature reducers and is enhanced with middleware.
// `persistStore` wraps the store to enable the persistence features.

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';
import rootReducer from '../Reducers/rootReducer';

const initialState = {};
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',  // Key is used for the storage and should be unique
    storage,      // Define which storage to use
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // Creating persisted reducer

const store = createStore(
    persistedReducer, // Use persisted reducer instead of rootReducer directly
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);

const persistor = persistStore(store); // Used to create the persisted store

export { store, persistor }; // Export both store and persistor