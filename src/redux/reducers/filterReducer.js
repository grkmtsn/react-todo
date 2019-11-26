import { SET_CATEGORY_FILTER } from '../actions';

const FilterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case SET_CATEGORY_FILTER:
      return action.payload.filter;
    default:
      return state;
  }
};

export default FilterReducer;
