import { FC } from "react";

import Container from "../../components/Container/Container";
import { ChakraProvider } from "@chakra-ui/react";

import PdSkeleton from "../../components/Skeletons/ProfileDetailsSkeleton/PdSkeleton";

import BlogByUser from "../../components/BlogByUser/BlogByUser";

import { Helmet } from "react-helmet";
import useBlogByUser from "../../hooks/useBlogByUser";
import AboutUser from "../../components/User/AboutUser";
import useAboutUser from "../../hooks/useAboutUser";

const Profile: FC = (): JSX.Element => {
  const { data, isLoading } = useBlogByUser();

  const {
    data: userData,
    edit,
    handleEdit,
    handleSave,
    about,
  } = useAboutUser();

  return (
    <div>
      <Helmet>
        <title>Profile | MetaBlog</title>
      </Helmet>
      <Container>
        <ChakraProvider>
          <>
            {/* profile details section */}
            {isLoading ? (
              <ChakraProvider>
                <PdSkeleton />
              </ChakraProvider>
            ) : (
              <AboutUser
                userData={userData}
                about={about}
                edit={edit}
                handleEdit={handleEdit}
                handleSave={handleSave}
              />
            )}
            {/* Blog by user Section here */}
            <BlogByUser isLoading={isLoading} data={data} />
          </>
        </ChakraProvider>
      </Container>
    </div>
  );
};

export default Profile;
