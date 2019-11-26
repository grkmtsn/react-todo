import uuid from 'uuid/v1';
import { storage } from '@/helpers';

import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  SELECT_EDIT_TODO
} from '../actions';

const TodosReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const id = uuid();
      const { category, title, date, hour } = action.payload.body;
      const todoItem = {
        id,
        title,
        category,
        date,
        hour,
        completed: false,
      };
      const localState = { ...state, todos: [...state.todos, todoItem], selectedTodo: {} }
      storage.set(localState, 'state', true);

      return { ...state, todos: [...state.todos, todoItem], selectedTodo: {} };
    }

    case DELETE_TODO: {
      const todos = state.todos.filter(({ id }) => id !== action.payload.id);
      const localState = { ...state, todos, selectedTodo: {} }
      storage.set(localState, 'state', true);
      return { ...state, todos, selectedTodo: {} };
    }

    case EDIT_TODO: {
      const todos = state.todos.map(todo => {
        if (todo.id === action.payload.modifiedTodo.id) {
          todo = action.payload.modifiedTodo;
        }
        return todo;
      });
      const localState = { ...state, todos, selectedTodo: {} }
      storage.set(localState, 'state', true);
      return { ...state, todos, selectedTodo: {} };
    }

    case TOGGLE_TODO: {
      const todos = state.todos.map(todo => {
        if (todo.id === action.payload.todo.id) {
          const newItem = { ...todo };
          newItem.completed = !newItem.completed;
          return newItem;
        }

        return todo;
      });
      const localState = { ...state, todos }
      storage.set(localState, 'state', true);
      return { ...state, todos };
    }

    case SELECT_EDIT_TODO: {
      const todo = state.todos.find(({ id }) => id === action.payload.id);
      return { ...state, selectedTodo: todo };
    }

    default: {
      return state;
    }
  }
};

export default TodosReducer;