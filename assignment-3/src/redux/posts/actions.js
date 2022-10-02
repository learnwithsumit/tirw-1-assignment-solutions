import {
  CLEAR_FILTER,
  CLEAR_SEARCH_TEXT,
  UPDATE_FILTER,
  UPDATE_SEARCH_TEXT,
} from './actionTypes';

// update fitler - (filterBy - will be a object)
export const updateFilter = (filterBy) => {
  return { type: UPDATE_FILTER, payload: filterBy };
};

// update search (searchText - will be a string)
export const updateSearchText = (searchText) => {
  return { type: UPDATE_SEARCH_TEXT, payload: searchText };
};

// clear search text
export const clearSearchText = () => {
  return { type: CLEAR_SEARCH_TEXT };
};

// clear filter
export const clearFilter = () => {
  return { type: CLEAR_FILTER };
};
