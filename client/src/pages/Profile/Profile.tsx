import { FC } from "react";

import Container from "../../components/Container/Container";
import { ChakraProvider } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import PdSkeleton from "../../components/Skeletons/ProfileDetailsSkeleton/PdSkeleton";
import { BlogsProps } from "../../api/useBlogData";
import useAxiosSecure from "../../api/useAxiosSecure";
import BlogByUser from "../../components/BlogByUser/BlogByUser";
import useAuth from "../../hooks/useAuth";

const Profile: FC = (): JSX.Element => {



  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data = [] as BlogsProps[], isLoading } = useQuery({
    queryKey: ["blogByUser", user?.uid],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs?authorId=${user?.uid}`);
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

       <BlogByUser isLoading={isLoading} data={data} />
      </div>
    </Container>
  );
};

export default Profile;
