import { storage } from '@/helpers';
import { FETCH_STATE, SAVE_STATE } from '../actions';

const LOCALSTORAGE_KEY = 'state';

const storageReducer = (state, action) => {
  switch (action.type) {
    case FETCH_STATE: {
      const localState = storage.get(LOCALSTORAGE_KEY);
      if (localState) {
        return { ...state, todos: localState.todos, selectedTodo: {} };
      }
      return state;
    }

    case SAVE_STATE: {
      if (action.payload.state.length === 0) {
        storage.clear(LOCALSTORAGE_KEY)
      } else {
        storage.set(action.payload.state, LOCALSTORAGE_KEY, true);
      }
      return state;
    }

    default: {
      return state;
    }
  }
};

export default storageReducer;