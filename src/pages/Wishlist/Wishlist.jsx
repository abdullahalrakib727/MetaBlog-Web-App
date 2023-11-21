import Swal from "sweetalert2";

import { MdOutlineDeleteOutline } from "react-icons/md";
import { PhotoProvider, PhotoView } from "react-photo-view";
import useWIshlist from "../../hooks/useWIshlist";

const Wishlist = () => {
  const [wishlists, refetch] = useWIshlist();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/wishlist/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your blog has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="min-h-screen container mx-auto">
      {wishlists.map((wishlist) => (
        <div
          className="flex flex-col border py-5 mt-10 items-center justify-center mb-10"
          key={wishlist._id}
        >
          <h2 className="mt-10 text-center text-2xl font-bold">
            {wishlist.title}
          </h2>
          <div className="w-1/2 lg:w-2/6 py-5">
            <PhotoProvider>
              <PhotoView src={wishlist.photoUrl}>
                <img src={wishlist.photoUrl} alt="" />
              </PhotoView>
            </PhotoProvider>
          </div>
          <p className="py-5 px-10">{wishlist.shortDescription}</p>
          <div>
            <button
              onClick={() => handleDelete(wishlist._id)}
              className="btn text-base btn-outline normal-case hover:bg-red-500"
            >
              <MdOutlineDeleteOutline /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
