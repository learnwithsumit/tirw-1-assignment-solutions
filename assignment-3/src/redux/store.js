import { createStore } from 'redux';
import reducer from './posts/reducer';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // we can use this intead of redux-devtools-extension for basic store
);

export default store;
