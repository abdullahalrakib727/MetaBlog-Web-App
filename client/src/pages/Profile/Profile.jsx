import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Container from "../../components/Container/Container";
import { ChakraProvider } from "@chakra-ui/react";
import CardSkeleton from "../../components/Skeletons/CardSkeleton/CardSkeleton";

import { useQuery } from "@tanstack/react-query";

import PdSkeleton from "../../components/Skeletons/ProfileDetailsSkeleton/PdSkeleton";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import BlogCard from "../../components/BlogCard/BlogCard";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();

  const { data = [], isLoading } = useQuery({
    queryKey: ["blogByUser", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/blogs?authorId=${user.uid}`);
      return res.data.data;
    },
  });

  return (
    <Container>
      <div className="mt-6  dark:text-white">
        {/* profile details section */}
        {isLoading ? (
          <ChakraProvider>
            <PdSkeleton />
          </ChakraProvider>
        ) : (
          <section className="max-w-[1216px] lg:max-h-[344px] bg-[#F6F6F7] dark:bg-[#242535] dark:text-white p-12 rounded-xl mb-12">
            <div className="flex flex-col justify-center items-center max-w-[648px] lg:max-h-[284px] mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <img
                  className="max-w-[64px] max-h-[64px] object-contain rounded-full"
                  src={user?.photoURL}
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
              <p className="text-center text-[#3B3C4A] text-lg dark:text-[#BABABF]">
                Meet {user?.displayName}, a passionate writer and blogger with a
                love for technology and travel. {user?.displayName} holds a
                degree in Computer Science and has spent years working in the
                tech industry, gaining a deep understanding of the impact
                technology has on our lives.
              </p>
            </div>
          </section>
        )}
        {/* User's post section */}

        <section className="mb-24">
          <ChakraProvider>
            {isLoading ? (
              <CardSkeleton />
            ) : (
              <>
                {data.length > 0 ? (
                  <>
                    <h3 className="text-2xl px-4 xl:px-0 font-bold my-5 dark:text-white ">
                      Blogs by you
                    </h3>
                    <div className="flex justify-center px-4 xl:px-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
                        {data.map((blog) => (
                          <BlogCard
                            key={blog._id}
                            isLoaded={isLoading}
                            blog={blog}
                          ></BlogCard>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl px-4 xl:px-0 font-bold my-5 dark:text-white ">
                      {"You haven't wrote any blogs yet"}
                    </h3>
                  </>
                )}
              </>
            )}
          </ChakraProvider>
        </section>
      </div>
    </Container>
  );
};

export default Profile;
