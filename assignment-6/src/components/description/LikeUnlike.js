import { useDispatch } from 'react-redux';
import likeImage from '../../assets/like.svg';
import unlikeImage from '../../assets/unlike.svg';
import { updateVideoReaction } from '../../features/video/videoSlice';

export default function LikeUnlike({ likes, unlikes, id }) {
  const dispatch = useDispatch();
  const reactionHandler = ({ id, reaction }) => {
    dispatch(updateVideoReaction({ id, reaction }));
  };
  return (
    <div className="flex gap-10 w-48">
      <div className="flex gap-1">
        <div
          className="shrink-0 cursor-pointer"
          onClick={() => reactionHandler({ id, reaction: 'like' })}
        >
          <img className="w-5 block" src={likeImage} alt="Like" />
        </div>
        <div className="text-sm leading-[1.7142857] text-slate-600">
          {likes >= 1000 ? `${likes}K` : likes}
        </div>
      </div>
      <div className="flex gap-1">
        <div
          onClick={() => reactionHandler({ id, reaction: 'unlike' })}
          className="shrink-0 cursor-pointer"
        >
          <img className="w-5 block" src={unlikeImage} alt="Unlike" />
        </div>
        <div className="text-sm leading-[1.7142857] text-slate-600">
          {unlikes >= 1000 ? `${unlikes}K` : unlikes}
        </div>
      </div>
    </div>
  );
}
