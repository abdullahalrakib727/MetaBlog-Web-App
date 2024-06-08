import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import useBanner from "./useBanner";

const Banner = () => {
  const { data } = useBanner();

  return (
    <Link to={`/blogs/${data?.slug}`}>
      <section className="relative">
        <img
          className="xl:max-w-[1216px] xl:max-h-[600px] xl:min-w-[1216px] lg:min-h-[600px] lg:rounded-xl mx-auto"
          src={data?.photoUrl}
          alt={data?.title}
        />
        <div className="lg:min-w-[518px] lg:min-h-[304px] rounded-xl  md:-bottom-20 lg:-bottom-24 border left-16 md:left-32 lg:left-24 bg-[#FFF] lg:p-10 p-3 md:absolute border-[#E8E8EA] shadow-md shadow-[#181A2A1F] dark:bg-[#181A2A] dark:border-[#242535]">
          <div className="max-w-[518px]">
            <span className="bg-[#4B6BFB] rounded-md text-white px-2 py-1 text-sm text-center mt-2 lg:mt-0">
              {data.category}
            </span>
            <h1 className="text-[#181A2A] dark:text-white text-xl mt-4 mb-6 lg:text-4xl font-semibold max-w-[400px] lg:max-w-[518px] ">
              {data?.title}
            </h1>
            <div className="flex gap-3 items-center mt-auto dark:text-[#97989F]">
              <img
                src={data?.authorImg}
                className="max-w-[36px] max-h-[36px] rounded-full"
                alt=""
              />
              <p className="text-[#97989F] text-base font-medium">
                {data?.authorName}
              </p>
              <p className="ml-2 font-normal text-base text-[#97989F]">
                {data?.published && !isNaN(Date.parse(data?.published))
                  ? format(parseISO(data?.published), "MMMM dd, yyyy")
                  : null}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default Banner;
