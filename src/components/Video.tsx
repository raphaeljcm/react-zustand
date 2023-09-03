import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import { next, useCurrentLesson } from '../store/slices/player';

export function Video() {
  const { currentLesson } = useCurrentLesson();

  const dispatch = useDispatch();

  const handlePlayNext = () => dispatch(next());

  return (
    <div className="flex-1 bg-zinc-950 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
        onEnded={handlePlayNext}
        playing
        controls
      />
    </div>
  );
}
