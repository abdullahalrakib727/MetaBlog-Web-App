import axios from "axios";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import { MdCancel, MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
import userIcon from "../../../assets/images.png";
import useAuth from "../../../hooks/useAuth";

const Comment = ({ c, refetch }) => {
  const { _id, commenter, commenterImg, comment } = c;
  const { user } = useAuth();
  // console.log(c)

  const [editComment, setEditComment] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true);
    setShowMenu(false);
    setShowEdit(true);
  };

  const handleEdit = () => {
    setEditComment(true);
    setShowMenu(false);
    setShowEdit(false);
  };
  const handleDeleteComment = () => {
    // setEditComment(false)
    setOpenMenu(true);
    setShowMenu(true);
    setOpenMenu(false);

    //  delete the comment from site

    Swal.fire({
      title: "Do you want to delete this comment?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://blog-website-server-theta.vercel.app/comments/${_id}`,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your comment has been deleted.",
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

  //  edit the comment

  const handleEditComment = (e) => {
    e.preventDefault();
    setEditComment(false);
    setOpenMenu(false);
    setShowMenu(true);
    const updated = e.target.comment.value;
    const updatedComment = { comment: updated };

    // console.log(updatedComment)

    //  submit edited comment to backend

    if (c.commenterEmail === user.email) {
      axios
        .patch(
          `https://blog-website-server-theta.vercel.app/comments/${_id}`,
          updatedComment,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
          }
        });
    }
  };

  const handleCancel = () => {
    setEditComment(false);
    setOpenMenu(false);
    setShowMenu(true);
    refetch();
  };

  return (
    <div className="p-2 bg-white  border-b ml-5 mr-5">
      <div className="flex gap-4">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full h-10 w-10">
            <img src={commenterImg ? commenterImg : userIcon} alt="" />
          </div>
        </div>
        <div>
          <p className="font-semibold text-lg">{commenter}</p>
          {editComment ? (
            <form className="mb-10" onSubmit={(e) => handleEditComment(e)}>
              <textarea
                name="comment"
                className="textarea textarea-info"
                defaultValue={comment}
              ></textarea>
              <br />
              <button type="submit" className="text-2xl">
                {" "}
                <IoMdSave />
              </button>
            </form>
          ) : (
            <p className="text-sm font-semibold">{comment}</p>
          )}
        </div>
      </div>
      {showMenu && c.commenterEmail === user.email && (
        <button onClick={handleOpenMenu}>
          <CiMenuKebab />
        </button>
      )}
      {openMenu && (
        <>
          {showEdit && c.commenterEmail === user.email && (
            <button onClick={handleEdit} className="text-xl">
              <FaEdit />
            </button>
          )}
          {editComment && (
            <button onClick={handleCancel} className="ml-5 text-2xl">
              <MdCancel />
            </button>
          )}
          {!editComment && c.commenterEmail === user.email && (
            <button onClick={handleDeleteComment} className="ml-5 text-xl">
              <MdOutlineDelete />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;
