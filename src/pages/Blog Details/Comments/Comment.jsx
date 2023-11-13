const Comment = ({ c }) => {
  const { commenter, commenterImg, comment } = c;
  console.log(comment);
  return (
    <div className="border p-2 bg-blue-500 text-white">
      <div className="flex gap-4">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-12">
            <img src={commenterImg} alt="" />
          </div>
        </div>
        <div>
        <p>{commenter}</p>
        <p>{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
