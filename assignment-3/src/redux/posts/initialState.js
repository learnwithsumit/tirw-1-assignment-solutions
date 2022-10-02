// data import
import { posts } from '../../data';
// initial state
const initialState = {
  all_post: posts,
  filtered_post: posts,
  searchText: '',
  filterBy: {},
};

export default initialState;
