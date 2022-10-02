import { useSelector } from 'react-redux';
import Filter from './Filter';
import Post from './Post';
import SectionHeader from './SectionHeader';
const PostContainer = () => {
  const { filtered_post: posts, filterBy } = useSelector((state) => state);
  const filter = Object.keys(filterBy);
  return (
    <div className="relative max-w-7xl mx-auto">
      {/* title and subtitle */}
      <SectionHeader />
      {/* if filtered then show filter option */}
      {filter.length > 0 &&
        filter.map((name, index) => {
          return <Filter key={index} name={name} value={filterBy[name]} />;
        })}
      {/* if post not found */}
      {posts.length < 1 && (
        <p className="text-xl font-bold text-red-400">No Post Found.</p>
      )}
      {/* post list  */}
      <div className="mt-12 max-w-lg grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
};
export default PostContainer;
