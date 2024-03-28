import useAuth from "../../hooks/useAuth";
import moment from "moment";

const DashBoardHome = () => {
  const { user } = useAuth();
  const currentDay = moment().format("dddd");
  return (
    <section className="dark:text-white">
      <h1 className="text-xl font-semibold mb-2">
        Welcome {user?.displayName}
      </h1>
      <p className="text-sm font-semibold">Toaday is {currentDay}</p>
      <h1 className="mt-4 text-center font-bold text-lg">Current stats :</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-6">
        <div className="bg-[#E8E8EA] dark:bg-[#242535] p-3 rounded-sm">Total Post : </div>
        <div className="bg-[#E8E8EA] dark:bg-[#242535] p-3 rounded-sm">Total pending post :</div>
        <div className="bg-[#E8E8EA] dark:bg-[#242535] p-3 rounded-sm">Total approved post :</div>
      </div>
    </section>
  );
};

export default DashBoardHome;
