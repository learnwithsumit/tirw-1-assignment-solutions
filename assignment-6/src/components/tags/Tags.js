import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags } from '../../features/tags/tagsSlice';
import { clearFilters } from '../../features/filter/filterSlice';
import { ReactComponent as CrossIcon } from '../../assets/cross.svg';
import Tag from './Tag';

export default function Tags() {
  const { tags } = useSelector((state) => state.tags);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  //   clear filters handler
  const clearFiltersHandler = () => {
    dispatch(clearFilters());
  };
  return tags?.length > 0 ? (
    <section>
      <div className="max-w-7xl mx-auto flex items-center justify-between border-b overflow-y-auto">
        <div className="px-5 py-6 lg:px-0 flex gap-2">
          {tags.map((tag) => (
            <Tag key={tag.id} title={tag.title} />
          ))}
        </div>
        <div
          onClick={clearFiltersHandler}
          className="bg-red-100 text-red-500 px-4 py-1 cursor-pointer flex items-center justify-center rounded-full space-x-1 group hover:bg-red-200 hover-text-red-600 transition"
        >
          <CrossIcon className="w-2 h-2 mt-1 fill-red-600 group-hover:fill-red-700 shadow-md" />
          <span>Clear</span>
        </div>
      </div>
    </section>
  ) : null;
}
