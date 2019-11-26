export const FETCH_STATE = 'Fetch state';
export const SAVE_STATE = 'Save state';
export const TOGGLE_TODO = 'Toggle todo';
export const ADD_TODO = 'Add todo';
export const EDIT_TODO = 'Edit todo';
export const DELETE_TODO = 'Delete todo';
export const SELECT_EDIT_TODO = 'Select edit todo';

export const FetchState = () => ({
  type: FETCH_STATE,
  payload: {},
});

export const SaveState = state => ({
  type: SAVE_STATE,
  payload: { state },
});

export const ToggleTodo = todo => ({
  type: TOGGLE_TODO,
  payload: { todo },
});

export const AddTodo = body => ({
  type: ADD_TODO,
  payload: { body },
});

export const EditTodo = modifiedTodo => ({
  type: EDIT_TODO,
  payload: { modifiedTodo },
});

export const DeleteTodo = id => ({
  type: DELETE_TODO,
  payload: { id },
});

export const SelectEditTodo = id => ({
  type: SELECT_EDIT_TODO,
  payload: { id },
});