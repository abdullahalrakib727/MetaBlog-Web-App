import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);


  const utcTimestamp = user?.metadata.creationTime;

  const date = new Date(utcTimestamp);


  date.setHours(date.getHours() + 6);


  const formattedTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="flex gap-5 px-20 min-h-screen items-center">
      <div>
      <img src={user?.photoURL} alt="" />
      </div>
     <div>
     <h3>Name: {user?.displayName}</h3>
        <p>Email : {user?.email}</p>
        <p>Verified : {user?.emailVerified ? "yes" : "no"}</p>
        <p> Phone no : {user?.phoneNumber ? user?.phoneNumber : "Not provided"}</p>
        <p>Account created at : {formattedTime}</p>
     </div>
    </div>
  );
};

export default Profile;
