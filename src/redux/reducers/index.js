import reduceReducers from 'reduce-reducers';

import InitialState from './initialState';
import TodoReducer from './todoReducer';
import StorageReducer from './storageReducer';

const AppReducer = reduceReducers(InitialState, StorageReducer, TodoReducer);

export default AppReducer;