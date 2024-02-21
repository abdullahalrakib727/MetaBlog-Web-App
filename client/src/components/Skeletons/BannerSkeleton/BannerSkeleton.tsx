import {
  Box,
  ChakraProvider,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { type FC } from "react";

const BannerSkeleton: FC = (): JSX.Element => {
  return (
    <ChakraProvider>
      <section className="relative">
        <div className="h-[300px] md:max-w-[700px] md:h-[400px] lg:max-w-[1000px] lg:h-[600px] lg:rounded-xl xl:max-w-[1216px] xl:h-[600px] xl:min-w-[1216px]  mx-auto">
          <Skeleton height="100%" bg="blue.500" color="white"></Skeleton>
        </div>
        <div className=" md:w-[400px] lg:min-w-[518px] lg:min-h-[304px] rounded-xl  md:-bottom-20 lg:-bottom-20 border left-16 md:left-32 lg:left-24 bg-[#FFF] lg:p-10 p-3 md:absolute border-[#E8E8EA] shadow-md shadow-[#181A2A1F] dark:bg-[#181A2A] dark:border-[#242535]">
          <Box padding="6" >
            <Skeleton mt="2" height="13px" width="90px" />
            <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
            <div className="flex flex-row items-center gap-3">
              <SkeletonCircle mt="5" size="10" />
              <Skeleton mt="5" height="10px" width="100px" />
              <Skeleton mt="5" height="10px" width="100px" />
            </div>
          </Box>
        </div>
      </section>
    </ChakraProvider>
  );
};

export default BannerSkeleton;
