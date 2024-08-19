import { FC } from "react";

const Adds: FC = (): JSX.Element => {
  return (
    <>
      <div className="max-w-[750px] lg:min-w-[750px] min-h-[100px] max-h-[100px] bg-[#E8E8EA] dark:bg-[#242535] text-[#696A75] dark:text-[#696A75] text-center flex flex-col justify-center items-center px-2 md:min-w-[500px]
      rounded-xl
      ">
        <div className="r">
          <p>Advertisement</p>
          <h1>You can place your add here</h1>
          <p>750x100</p>
        </div>
      </div>
    </>
  );
};

export default Adds;
