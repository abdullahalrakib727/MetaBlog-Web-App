// import { useContext } from "react";
import "react-photo-view/dist/react-photo-view.css";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../Providers/AuthProvider";
import { format } from "date-fns";

import "aos/dist/aos.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

const RecentBlogCard = ({ blog }) => {
  // const axiosSecure = useAxiosSecure();

  // const { user } = useContext(AuthContext);
  const {
    _id,
    title,
    photoUrl,

    category,
    authorName,
    authorImg,
    published,
  } = blog;

  const publishDate = format(published, "MMMM d, yyyy");



  return (

      <Link to={`/all/${_id}`} className="bg-white border border-[#E8E8EA] p-4 rounded-xl max-w-[392px] flex flex-col">
        <PhotoProvider>
          <PhotoView src={photoUrl}>
            <img
              className="hover:cursor-zoom-in h-[170px] md:h-[240px] max-w-[360px] rounded-md"
              src={photoUrl}
              alt=""
            />
          </PhotoView>
        </PhotoProvider>
        <div className="mt-6">
          <span
            style={{ backgroundColor: "rgba(75, 107, 251, 0.05)" }}
            className="px-[10px] py-1 text-[#4B6BFB] text-sm font-medium"
          >
            {category}
          </span>
        </div>
        <div className="mt-4 text-2xl font-semibold mb-5">{title}</div>
        {/* author details */}
        <div className="flex gap-3 items-center mt-auto">
          <img
            src={authorImg}
            className="max-w-[36px] max-h-[36px] rounded-full"
            alt=""
          />
          <p className="text-[#97989F] text-base font-medium">{authorName}</p>
          <p className="ml-2 font-normal text-base text-[#97989F]">
            {publishDate}
          </p>
        </div>
      </Link>
  );
};

export default RecentBlogCard;
