import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../api/useAxiosSecure";

type AllUsersData = {
  uid: string;
  email: string;
  photo: string;
  name: string;
  role: string;
}[];

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery<AllUsersData>({
    queryKey: ["all-users"],
    queryFn: async () => {
      const response = await axiosSecure("/admin/users");

      return response.data.data;
    },
  });

  return (
    <section className="dark:text-white">
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
                <tr>
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
                    <button className="py-1 px-2 bg-blue-600 rounded-md">
                      {user.role === "admin" ? "Make User" : "Make Admin"}
                    </button>
                  </td>
                  <td>
                    <button className="py-1 px-2 bg-blue-600 rounded-md">
                      Delete
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
