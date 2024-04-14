// src/store/store.js
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
