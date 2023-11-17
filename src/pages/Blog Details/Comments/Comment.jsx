import userIcon from '../../../assets/images.png'

const Comment = ({ c }) => {
  const { commenter, commenterImg, comment } = c;

  return (
    <div className="p-2 bg-white  border-b ml-5 mr-5">
      <div className="flex gap-4">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full h-10 w-10">
            <img src={commenterImg? commenterImg: userIcon } alt="" />
          </div>
        </div>
        <div>
        <p className="font-semibold text-lg">{commenter}</p>
        <p className="text-sm font-semibold">{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
