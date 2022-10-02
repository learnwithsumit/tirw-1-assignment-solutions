import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchIcon from '../icons/search.svg';
import {
  clearFilter,
  updateFilter,
  updateSearchText,
} from './../redux/posts/actions';
const SearchBox = () => {
  const { searchText, filterBy } = useSelector((state) => state);
  const dispatch = useDispatch();

  // I could use third party library or hook to implement debouncing, but tried manually following lws javascript debounce youtube video
  let debounce = (fn, delay) => {
    let timerId;
    return function (searchText) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(searchText);
      }, delay);
    };
  };

  // Memoize  debounce function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  debounce = useCallback(
    debounce((searchText) => {
      dispatch(updateFilter({ name: 'search', value: searchText }));
    }, 500),
    []
  );

  // handled search functionality in useEffect
  useEffect(() => {
    if (searchText) {
      debounce(searchText);
    } else {
      // else mean when searchText is empty
      if (filterBy.search) {
        dispatch(clearFilter());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, dispatch, filterBy.search]);

  return (
    <>
      <div className="border mt-6 border-slate-200 flex items-center w-11/12 lg:w-1/2 mx-auto h-12 px-5 rounded-lg text-sm ring-emerald-200">
        <input
          type="search"
          name="search"
          placeholder="Search"
          className="outline-none border-none  h-full w-full mr-2"
          value={searchText}
          onChange={(e) => dispatch(updateSearchText(e.target.value))}
        />
        <img
          src={searchIcon}
          alt="search"
          className="inline h-6 cursor-pointer"
        />
      </div>
    </>
  );
};
export default SearchBox;
