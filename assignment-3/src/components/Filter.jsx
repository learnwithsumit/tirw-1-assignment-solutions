import { useDispatch } from 'react-redux';
import { clearFilter } from '../redux/posts/actions';
const Filter = ({ name, value }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between my-8">
      <p className="capitalize">
        Showing results for {name}:
        <span className="px-4 py-1 bg-slate-800 text-white rounded-full ml-4 lowercase">
          {value}
        </span>
      </p>
      <button
        onClick={() => dispatch(clearFilter())}
        className="px-4 py-1 bg-red-400 text-white rounded-md capitalize"
      >
        clear filter
      </button>
    </div>
  );
};
export default Filter;
