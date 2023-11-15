import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

const Wishlist = () => {
  const { user } = useContext(AuthContext);

  // Each blog should have a title, image, short description, category, details button and
  // remove wishlist button
  const [wishlists, setWishlists] = useState([]);

  const url = `http://localhost:5000/wishlist?email=${user?.email}`;

  const fetchData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWishlists(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        fetch(`http://localhost:5000/wishlist/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            fetchData();
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
            <img src={wishlist.photoUrl} alt="" />
          </div>
          <p className="py-5 px-10">{wishlist.shortDescription}</p>
          <button
            onClick={() => handleDelete(wishlist._id)}
            className="btn btn-warning"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
