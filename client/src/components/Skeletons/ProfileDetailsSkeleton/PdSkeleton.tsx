import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";

const PdSkeleton: FC = (): JSX.Element => {
  return (
    <section className="max-w-[1216px] max-h-[344px] bg-[#F6F6F7] p-12 rounded-xl mb-12">
      <div className="flex flex-col justify-center items-center max-w-[648px] max-h-[284px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <SkeletonCircle size="14" />
          <div>
            <Skeleton height="16px" width="150px" />{" "}
            <Skeleton height="12px" width="100px" />
          </div>
        </div>
        <Box width="100%" maxWidth="648px">
          <SkeletonText mt="0" noOfLines={5} spacing="3" skeletonHeight="2" />
        </Box>
      </div>
    </section>
  );
};

export default PdSkeleton;
