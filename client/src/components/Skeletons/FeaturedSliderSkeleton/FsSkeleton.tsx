import { FC } from "react";
import "./FsSkeleton.css";

const FsSkeleton: FC = (): JSX.Element => {
  return (
    <div className=" background-skeleton h-[450px] py-10 my-12 rounded-xl flex bg-cover bg-no-repeat max-w-[1216px]">
      <div className="p-10 self-end">
        <div className="skeleton skeleton__category-text mb-4"></div>
        <div className="skeleton skeleton__heading"></div>
        <br />
        <div className="skeleton skeleton__heading"></div>
        <div className="flex items-center gap-5 mt-6">
          <div className="skeleton w-[36px] h-[36px] rounded-full" />
          <div className="skeleton skeleton__author-name"></div>
          <div className="skeleton skeleton__publish-date"></div>
        </div>
      </div>
    </div>
  );
};

export default FsSkeleton;
