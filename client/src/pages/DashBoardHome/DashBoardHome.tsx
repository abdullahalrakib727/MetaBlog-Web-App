import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import useAxiosSecure from "../../api/useAxiosSecure";

type DashboardData = {
  total: number;
  draft: number;
  published: number;
};

const DashBoardHome = () => {
  const { user } = useAuth();
  const currentDay = moment().format("dddd");

  const axiosSecure = useAxiosSecure();

  const { data = {} as DashboardData } = useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await axiosSecure.get("/blogs/stats");
      return response.data.data;
    },
  });

  return (
    <section className="dark:text-white">
      <h1 className="text-xl font-semibold mb-2">
        Welcome {user?.displayName}
      </h1>
      <p className="text-sm font-semibold">Toaday is {currentDay}</p>
      <h1 className="mt-4 text-center font-bold text-lg">Current stats :</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
        <div className="bg-[#E8E8EA] dark:bg-[#242535] p-3 rounded-sm max-w-52">
          <div className="flex justify-between ">
            <span>Total Post :</span>{" "}
            <span>{data?.total ? data?.total : 0}</span>
          </div>
        </div>
        <div className="bg-[#E8E8EA] dark:bg-[#242535] p-3 rounded-sm max-w-52">
          <div className="flex justify-between ">
            <span>Pending :</span> <span>{data?.draft ? data?.draft : 0}</span>
          </div>
        </div>
        <div className="bg-[#E8E8EA] dark:bg-[#242535] p-3 rounded-sm max-w-52">
          <div className="flex justify-between ">
            <span>Published :</span>{" "}
            <span>{data?.published ? data?.published : 0}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashBoardHome;
