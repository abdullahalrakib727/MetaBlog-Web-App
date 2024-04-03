import useAuth from "../../hooks/useAuth";
import moment from "moment";
import { Helmet } from "react-helmet";
import useAdmin from "../../hooks/useAdmin";
import useUserStats from "../../hooks/useUserStats";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const DashBoardHome = () => {
  const { user } = useAuth();
  const currentDay = moment().format("dddd");

  const { result } = useAdmin();

  const { stats, isLoading } = useUserStats();

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="dark:text-white">
      <>
        <Helmet>
          <title>Dashboard | Home</title>
        </Helmet>
      </>
      <h1 className="text-xl font-semibold mb-2">
        Welcome{" "}
        <span className="font-bold text-blue-600">
          {result.isAdmin ? "Admin" : "User"}
        </span>
        <span> {user?.displayName}</span>
      </h1>
      <p className="text-sm font-semibold">Toaday is {currentDay}</p>
      <h1 className="mt-4 text-center font-bold text-lg">Current stats :</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
        <div className="bg-[#E8E8EA] dark:bg-[#242535] p-3 rounded-sm max-w-52">
          <div className="flex justify-between ">
            <span>Total Post :</span>{" "}
            <span>{stats?.total ? stats?.total : 0}</span>
          </div>
        </div>
        <div className="bg-[#E8E8EA] dark:bg-[#242535] p-3 rounded-sm max-w-52">
          <div className="flex justify-between ">
            <span>Pending :</span>{" "}
            <span>{stats?.draft ? stats?.draft : 0}</span>
          </div>
        </div>
        <div className="bg-[#E8E8EA] dark:bg-[#242535] p-3 rounded-sm max-w-52">
          <div className="flex justify-between ">
            <span>Published :</span>{" "}
            <span>{stats?.published ? stats?.published : 0}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashBoardHome;
