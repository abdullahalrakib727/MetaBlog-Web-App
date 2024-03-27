import { CiEdit } from "react-icons/ci";
import { MdOutlineCancel, MdOutlineSave } from "react-icons/md";
import { Box, ChakraProvider, SkeletonText } from "@chakra-ui/react";
import useAboutUser from "../../hooks/useAboutUser";

const AboutUser = () => {
  const { data, isLoading, edit, handleEdit, handleSave, about, user } =
    useAboutUser();

  return (
    <section className="max-w-[1216px] lg:max-h-[344px] bg-[#F6F6F7] dark:bg-[#242535] dark:text-white p-12 rounded-xl mb-12">
      <div className="flex flex-col justify-center items-center max-w-[648px] lg:max-h-[284px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <img
            className="max-w-[64px] max-h-[64px] object-contain rounded-full"
            src={
              data.photo ||
              user?.photoURL ||
              "https://i.ibb.co/Ydc2Yyb/download.png"
            }
            alt="user-image"
          />
          <div>
            <h4 className="font-medium text-xl text-[#181A2A] dark:text-white">
              {user?.displayName}
            </h4>
            <p className="text-[#696A75] font-normal text-sm dark:text-[#BABABF]">
              {data.role}
            </p>
          </div>
        </div>
        <div className="relative">
          {!edit && (
            <button onClick={handleEdit}>
              <CiEdit className="absolute text-lg dark:text-white right-0 -mt-5" />
            </button>
          )}
          {edit ? (
            <form onSubmit={handleSave}>
              <button type="submit">
                <MdOutlineSave className="absolute text-lg dark:text-white right-6 -mt-44" />
              </button>
              <button type="button" onClick={handleEdit}>
                <MdOutlineCancel className="absolute text-lg dark:text-white right-0 -mt-44" />
              </button>
              <textarea
                ref={about}
                name=""
                id=""
                cols={70}
                rows={5}
                defaultValue={data.bio}
                placeholder="Write something about yourself"
                className="w-full appearance-none focus:outline-none mt-2 dark:text-black p-2 border rounded-md text-black font-medium max-h-36"
              ></textarea>
            </form>
          ) : (
            <>
              {isLoading ? (
                <ChakraProvider>
                  <Box
                    padding="2"
                    boxShadow="lg"
                    className="bg-[#F6F6F7] dark:bg-[#242535] w-72 md:w-[500px]"
                  >
                    <SkeletonText
                      mt="0"
                      noOfLines={5}
                      spacing="3"
                      skeletonHeight="2"
                      className="bg-[#F6F6F7] dark:bg-[#242535] w-72 md:w-[500px]"
                    />
                  </Box>
                </ChakraProvider>
              ) : (
                <>
                  {data.bio ? (
                    <p className="text-[#181A2A] dark:text-white">{data.bio}</p>
                  ) : (
                    <p>Please write something about you</p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUser;
