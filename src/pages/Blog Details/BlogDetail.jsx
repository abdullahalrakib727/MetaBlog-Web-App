import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { Button } from "@mui/material";

const BlogDetail = () => {
    const {user} = useContext(AuthContext);
  const data = useLoaderData();
  const {
    _id,
    title,
    photoUrl,
    shortDescription,
    longDescription,
    authorImg,
    authorName,
    published, 
    authorEmail
  } = data;
//   console.log(data);


  const timestamp = published;

    const date = new Date(timestamp);
    

    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    
 
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
 
    const ampm = hours >= 12 ? 'PM' : 'AM';
    

    hours = hours % 12;
    hours = hours ? hours : 12; 
    
    
    const formattedTime = `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;



  return (
    <div className="container mx-auto">
      <h2 className="text-center mt-10 mb-7 lg:mb-20 text-3xl lg:text-6xl font-bold">
        {" "}
        "{title}"
      </h2>
      <div className="flex flex-col mb-10 3xl:flex-row gap-5 items-center">
        <img src={photoUrl} alt="" />
        <p className="font-semibold p-2 md:p-5 text-xl md:text-3xl">
          {shortDescription}
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="p-5 flex gap-5 items-center">
          <p className="text-2xl font-medium">Author: </p>
          <div className="flex items-center gap-2">
            <div className="avatar ">
              <div className="bg-neutral text-neutral-content rounded-full w-12">
                <img src={authorImg} alt="" />
              </div>
            </div>
            <p className="text-xl font-medium">{authorName}</p>
          </div>
        </div>
        <p className="font-medium mb-5 p-5">Published on: {formattedTime }</p>
      </div>
      <p className="md:text-2xl p-2 md:p-5 font-medium mb-10">
        {longDescription}
      </p>
      <div  className="mb-10 text-center">
        {
            authorEmail === user?.email && <Link to={`/update/${_id}`}><Button variant="contained">Update</Button></Link>
        }
      </div>
    </div>
  );
};

export default BlogDetail;
