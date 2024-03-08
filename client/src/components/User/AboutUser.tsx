import { CiEdit } from "react-icons/ci";
import useAuth from "../../hooks/useAuth";

const AboutUser = () => {
  const { user } = useAuth();

  return (
    <section className="max-w-[1216px] lg:max-h-[344px] bg-[#F6F6F7] dark:bg-[#242535] dark:text-white p-12 rounded-xl my-12">
      <div className="flex flex-col justify-center items-center max-w-[648px] lg:max-h-[284px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <img
            className="max-w-[64px] max-h-[64px] object-contain rounded-full"
            src={user?.photoURL || ""}
            alt="user-image"
          />
          <div>
            <h4 className="font-medium text-xl text-[#181A2A] dark:text-white">
              {user?.displayName}
            </h4>
            <p className="text-[#696A75] font-normal text-sm dark:text-[#BABABF]">
              Role
            </p>
          </div>
        </div>
        <div className="relative">
          <CiEdit className="absolute right-0 -mt-5" />
          <p className="text-justify text-[#3B3C4A] text-lg dark:text-[#BABABF]">
            Meet {user?.displayName}, a passionate writer and blogger with a
            love for technology and travel. {user?.displayName} holds a degree
            in Computer Science and has spent years working in the tech
            industry, gaining a deep understanding of the impact technology has
            on our lives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUser;
