
import "react-photo-view/dist/react-photo-view.css";
import { Link } from "react-router-dom";

import { format, parseISO } from 'date-fns';


import "aos/dist/aos.css";
import { PhotoProvider, PhotoView } from "react-photo-view";


const RecentBlogCard = ({ blog }) => {

  const {
    _id,
    title,
    photoUrl,
    category,
    authorName,
    authorImg,
    published,
  } = blog;

  const isValidDate = published && !isNaN(new Date(published));

  const publishDate = isValidDate ? format(parseISO(published), "MMMM dd, yyyy") : null;


  return (

      <Link to={`/all/${_id}`} className="bg-white border border-[#E8E8EA] dark:bg-[#181A2A] dark:border-[#242535] p-4 rounded-xl max-w-[392px] flex flex-col">
        <PhotoProvider>
          <PhotoView src={photoUrl}>

            <div className="h-[170px] md:h-[240px] max-w-[360px] overflow-hidden rounded-md">

            <img
              className="h-full w-full  hover:scale-110 ease-linear transition-transform duration-300 rounded-md"
              src={photoUrl}
              alt=""
            />
            </div>
          </PhotoView>
        </PhotoProvider>
        <Link className="mt-6">
          <span
            style={{ backgroundColor: "rgba(75, 107, 251, 0.05)" }}
            className="px-[10px] py-1 text-[#4B6BFB] text-sm font-medium"
          >
            {category}
          </span>
        </Link>
        <h2 className="mt-4 dark:text-white text-2xl font-semibold mb-5">{title}</h2>


        {/* author details */}
        <div className="flex gap-3 items-center mt-auto dark:text-[#97989F]">
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
