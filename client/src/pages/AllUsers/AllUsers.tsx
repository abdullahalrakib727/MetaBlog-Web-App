import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet";
import { MdOutlineDelete } from "react-icons/md";
import useGetAllUsersData from "../../hooks/useGetAllUsersData";

const AllUsers = () => {
  const { data, isLoading, loading, result } = useGetAllUsersData();

  if (loading || isLoading) return <LoadingSpinner />;

  if (result.isAdmin === false) return <h1>Not Authorized</h1>;

  return (
    <section className="dark:text-white">
      <>
        <Helmet>
          <title>All Users | MetaBlog</title>
        </Helmet>
      </>
      <h1 className="text-2xl">All Users page</h1>
      {/* user's table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="dark:text-white">
            <tr>
              <th></th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => {
              return (
                <tr
                  className="hover:bg-[#E8E8EA] dark:hover:bg-[#242535]"
                  key={user.uid}
                >
                  <th>{index + 1}</th>
                  <td>
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button className="py-1 px-2 bg-blue-600 hover:bg-green-400 transition-colors duration-300 text-white rounded-md">
                        Make User
                      </button>
                    ) : (
                      <button className="py-1 px-2 bg-blue-600 hover:bg-green-400 transition-colors duration-300 text-white rounded-md">
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td>
                    <button className="py-1 px-2 bg-blue-600 text-white text-xl hover:bg-red-500 transition-colors duration-300 rounded-md">
                      <MdOutlineDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllUsers;
