import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../features/videos/videosSlice';
import Loading from '../ui/Loading';
import VideoGridItem from './VideoGridItem';
import { ReactComponent as CrossIcon } from '../../assets/cross.svg';
import { clearAuthor, setTotalCount } from '../../features/filter/filterSlice';

export default function VideGrid() {
  const dispatch = useDispatch();
  const { videos, isLoading, isError, error } = useSelector(
    (state) => state.videos
  );
  const {
    tags,
    search,
    author,
    pagination: { limit, currentPage },
  } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchVideos({ tags, search, author, currentPage, limit }))
      .unwrap()
      .then((data) => dispatch(setTotalCount(data.total_count)));
  }, [dispatch, tags, search, author, currentPage, limit]);

  // decide what to render
  let content;

  if (isLoading) content = <Loading />;
  if (!isLoading && isError)
    content = <div className="col-span-12">{error}</div>;

  if (!isError && !isLoading && videos?.length === 0) {
    content = <div className="col-span-12">No videos found!</div>;
  }

  if (!isError && !isLoading && videos?.length > 0) {
    content = videos.map((video) => (
      <VideoGridItem key={video.id} video={video} />
    ));
  }

  return (
    <section>
      <div className="max-w-7xl mx-auto px-5 lg:px-0 my-12">
        <div className="flex items-center space-x-2">
          {search && (
            <p className="text-lg text-gray-700">
              You searched for: <span className="font-bold">"{search}"</span>
            </p>
          )}

          {author && (
            <div
              className="cursor-pointer"
              onClick={() => dispatch(clearAuthor())}
            >
              <h2 className="text-lg text-gray-700 flex items-center space-x-1">
                <span className="font-bold bg-blue-100 text-blue-700 px-4 py-1 ml-4 flex items-center">
                  {author}
                  <CrossIcon className="w-2 h-2 fill-red-900 ml-2 mt-1" />
                </span>
              </h2>
            </div>
          )}
        </div>
      </div>
      <section className="pt-12">
        <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
          {content}
        </div>
      </section>
    </section>
  );
}
