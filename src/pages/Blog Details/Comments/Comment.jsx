import userIcon from '../../../assets/images.png'

const Comment = ({ c }) => {
  const { commenter, commenterImg, comment } = c;
  // console.log(comment);
  return (
    <div className="p-2 bg-white  ml-5 mr-5">
      <div className="flex gap-4">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-12">
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
