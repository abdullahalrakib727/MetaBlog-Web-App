import useAuth from "../../hooks/useAuth";
import moment from "moment";

const DashBoardHome = () => {
  const { user } = useAuth();
const currentDay = moment().format('dddd');
  return (
    <section className="dark:text-white">
      <h1 className="text-xl font-semibold mb-2">Welcome {user?.displayName}</h1>
      <p>Toaday is {currentDay}</p>
    </section>
  );
};

export default DashBoardHome;
