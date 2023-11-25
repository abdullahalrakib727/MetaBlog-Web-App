import { Button, ChakraProvider } from '@chakra-ui/react'
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import TimeFormat from "../../function/TimeFormat";
const Profile = () => {
  const { user, sendVerificationEmail } = useContext(AuthContext);

  const utcTimestamp = user?.metadata.creationTime;

  const formattedTime = TimeFormat(utcTimestamp);

  const handleVerification = ()=>{
    sendVerificationEmail().then(result=>{
      console.log(result)
    })
  }


  return (
    <ChakraProvider>
      <div className="flex gap-5 px-20 min-h-screen items-center">
      <div>
        <img src={user?.photoURL} alt="" />
      </div>
      <div className='space-y-2'>
        <h3>Name: {user?.displayName}</h3>
        <p>Email : {user?.email}</p>
        <p>User verification : {user?.emailVerified ? <span className='text-green-500 font-bold'>verified</span> :  <span className='text-red-500 font-bold'>Not verified</span>}</p>
        <p>
          {" "}
          Phone no : {user?.phoneNumber ? user?.phoneNumber : "Not provided"}
        </p>
        <p>Account created at : {formattedTime}</p>
       {
        !user?.emailVerified &&  <Button onClick={handleVerification} className='mt-10' >Send Email Verification</Button>
       }
      </div>
    </div>
    </ChakraProvider>
  );
};

export default Profile;
