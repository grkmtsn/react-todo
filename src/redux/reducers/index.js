import { combineReducers } from 'redux';

import TodoReducer from './todoReducer';
import FilterReducer from './filterReducer';

const AppReducer = combineReducers({ todos: TodoReducer, filter: FilterReducer });

export default AppReducer;
