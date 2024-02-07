
// Import Swiper React components
import {  SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Link } from 'react-router-dom';

import { format, parseISO } from 'date-fns';

const FeaturedBlogs = ({blog}) => {


const {_id, title, photoUrl, authorName, published, category, authorImg} = blog;


    const isValidDate = published && !isNaN(new Date(published));

    const publishDate = isValidDate
      ? format(parseISO(published), "MMMM dd, yyyy")
      : null;


    return (
        <SwiperSlide>
            <Link to={`/all/${_id}`}>
          <section className="max-w-[1216px] overflow-hidden">
            <div
              style={{
                backgroundImage: `url(${photoUrl})`,
              }}
              className=" h-[450px] my-12 rounded-xl flex bg-cover bg-no-repeat max-w-[1216px]"
            >
              {/* details */}
              <div className="p-10 self-end">
                <p className="text-white bg-[#4B6BFB] inline-block py-1 px-[10px] rounded-md text-sm font-medium mb-4">
                  {category}
                </p>
                <h2 className="text-white text-3xl font-semibold max-w-[720px]">
                  {title}
                </h2>
                <div className="text-white flex items-center gap-5 mt-6">
                  <img
                    src={authorImg}
                    alt="author-image"
                    className="max-w-[36px] max-h-[36px] rounded-full"
                  />
                  <h6 className="font-medium text-base">{authorName}</h6>
                  <p className="text-base font-normal">{publishDate}</p>
                </div>
              </div>
            </div>
          </section>
        </Link>
        </SwiperSlide>
    );
};

export default FeaturedBlogs;