import uuid from 'uuid/v1';

import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  SELECT_EDIT_TODO,
  CLEAR_SELECTED_TODO,
} from '../actions';

const initalState = {
  list: [],
  selectedTodo: {},
};

const TodosReducer = (state = initalState, action) => {
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
      return { ...state, list: [...state.list, todoItem], selectedTodo: {} };
    }

    case DELETE_TODO: {
      const todos = state.list.filter(({ id }) => id !== action.payload.id);
      return { ...state, list: todos, selectedTodo: {} };
    }

    case EDIT_TODO: {
      const todos = state.list.map(todo => {
        if (todo.id === action.payload.modifiedTodo.id) {
          todo = action.payload.modifiedTodo;
        }
        return todo;
      });
      return { ...state, list: todos, selectedTodo: {} };
    }

    case TOGGLE_TODO: {
      const todos = state.list.map(todo => {
        if (todo.id === action.payload.todo.id) {
          const newItem = { ...todo };
          newItem.completed = !newItem.completed;
          return newItem;
        }

        return todo;
      });
      return { ...state, list: todos };
    }

    case SELECT_EDIT_TODO: {
      const todo = state.list.find(({ id }) => id === action.payload.id);
      return { ...state, selectedTodo: todo };
    }

    case CLEAR_SELECTED_TODO: {
      return { ...state, selectedTodo: {} };
    }

    default: {
      return state;
    }
  }
};

export default TodosReducer;
