import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension'; // Import composeWithDevTools

const initialState = {};

const middleware = [thunk];

// Use composeWithDevTools to apply middleware and enable Redux DevTools
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
