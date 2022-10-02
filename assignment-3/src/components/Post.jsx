import { useDispatch, useSelector } from 'react-redux';
import { clearSearchText, updateFilter } from './../redux/posts/actions';
const Post = ({ post }) => {
  const { title, image, author, category, postedAt, readTime } = post;
  const searchText = useSelector((state) => state.searchText);
  const dispatch = useDispatch();

  // handle update filter
  const handleUpdateFilter = ({ name, value }) => {
    if (searchText) {
      dispatch(clearSearchText());
    }
    dispatch(updateFilter({ name, value }));
  };
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shring-0">
        <img src={image} alt={title} className="w-full object-cover" />
        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="flex-1">
            <p
              className="text-sm font-medium text-indigo-600"
              onClick={() =>
                handleUpdateFilter({ name: 'category', value: category })
              }
            >
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 capitalize cursor-pointer">
                {category}
              </span>
            </p>
            <p className="mt-1 text-xl font-semibold capitalize text-gray-900">
              {title}
            </p>
          </div>
          <div className="mt-6 flex items-center">
            <div className="flex-shrink-0 cursor-pointer">
              <img
                src={author.avatar}
                alt={author.name}
                className="h-10 w-10 rounded-full"
                onClick={() =>
                  handleUpdateFilter({ name: 'author', value: author })
                }
              />
            </div>
            <div className="ml-3">
              <p
                className="text-sm font-medium text-gray-900 hover:underline cursor-pointer"
                onClick={() =>
                  handleUpdateFilter({ name: 'author', value: author })
                }
              >
                {author.name}
              </p>
              <div className="flex space-x-1 text-sm text-gray-500 font-light">
                <time dateTime="2020-03-16">{postedAt}</time>
                <span aria-hidden="true">&middot;</span>
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
