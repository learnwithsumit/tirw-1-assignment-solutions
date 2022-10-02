import { useDispatch } from 'react-redux';
import { updateSearchText } from '../features/filters/filtersSlice';

const Search = () => {
  const dispatch = useDispatch();

  // debounce function
  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  // change search text in the redux store
  const changeSearchText = (value) => {
    dispatch(updateSearchText(value));
  };

  // update search by debouncing
  const handleUpdateSearch = debounceHandler(changeSearchText, 500);

  return (
    <input
      className="flex items-center h-10 px-4 mx-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
      type="search"
      placeholder="Search for anything…"
      onChange={(e) => handleUpdateSearch(e.target.value)}
    />
  );
};
export default Search;
