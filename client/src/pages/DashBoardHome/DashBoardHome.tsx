import useAuth from "../../hooks/useAuth";

const DashBoardHome = () => {


const {user} = useAuth();


  return (
    <section>
      <h1 className="text-xl font-semibold">Welcome {user?.displayName}</h1>
      <p>Toaday is {'Monday'}</p>
    </section>
  );
};

export default DashBoardHome;
