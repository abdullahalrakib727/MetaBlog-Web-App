// import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";

interface LikeDisLikeProps {
  like: number;
  disLike: number;
  addLike: () => void;
  addDisLike: () => void;
}

const Reactions = ({
  like,
  disLike,
  addLike,
  addDisLike,
}: LikeDisLikeProps) => {
  return (
    <section className="dark:text-white flex gap-3 space-x-1">
      <div className="flex items-center">
        <button className="mr-2" onClick={addLike}>
          <BiSolidLike className="text-2xl" />
        </button>
        <span className="font-medium">{like}</span>
      </div>
      <div className="flex items-center">
        <button className="mr-2" onClick={addDisLike}>
          <BiSolidDislike className="text-2xl" />{" "}
        </button>
        <span className="font-medium">{disLike}</span>
      </div>
    </section>
  );
};

export default Reactions;
