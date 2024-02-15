import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";

const CardSkeleton: FC = (): JSX.Element => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Box padding="6" boxShadow="lg" bg="white">
        <Skeleton height="170px" />
        <SkeletonText mt="3" noOfLines={3} spacing="3" skeletonHeight="5" />
        <div className="flex items-center gap-4">
          <SkeletonCircle size="8" mt="2" />{" "}
          <Skeleton height="20px" width="100px" />{" "}
          <Skeleton height="20px" width="100px" />
        </div>
      </Box>
      <Box padding="6" boxShadow="lg" bg="white">
        <Skeleton height="170px" />
        <SkeletonText mt="3" noOfLines={3} spacing="3" skeletonHeight="5" />
        <div className="flex items-center gap-4">
          <SkeletonCircle size="8" mt="2" />{" "}
          <Skeleton height="20px" width="100px" />{" "}
          <Skeleton height="20px" width="100px" />
        </div>
      </Box>
      <Box padding="6" boxShadow="lg" bg="white">
        <Skeleton height="170px" />
        <SkeletonText mt="3" noOfLines={3} spacing="3" skeletonHeight="5" />
        <div className="flex items-center gap-4">
          <SkeletonCircle size="8" mt="2" />{" "}
          <Skeleton height="20px" width="100px" />{" "}
          <Skeleton height="20px" width="100px" />
        </div>
      </Box>
      <Box padding="6" boxShadow="lg" bg="white">
        <Skeleton height="170px" />
        <SkeletonText mt="3" noOfLines={3} spacing="3" skeletonHeight="5" />
        <div className="flex items-center gap-4">
          <SkeletonCircle size="8" mt="2" />{" "}
          <Skeleton height="20px" width="100px" />{" "}
          <Skeleton height="20px" width="100px" />
        </div>
      </Box>
      <Box padding="6" boxShadow="lg" bg="white">
        <Skeleton height="170px" />
        <SkeletonText mt="3" noOfLines={3} spacing="3" skeletonHeight="5" />
        <div className="flex items-center gap-4">
          <SkeletonCircle size="8" mt="2" />{" "}
          <Skeleton height="20px" width="100px" />{" "}
          <Skeleton height="20px" width="100px" />
        </div>
      </Box>
      <Box padding="6" boxShadow="lg" bg="white">
        <Skeleton height="170px" />
        <SkeletonText mt="3" noOfLines={3} spacing="3" skeletonHeight="5" />
        <div className="flex items-center gap-4">
          <SkeletonCircle size="8" mt="2" />{" "}
          <Skeleton height="20px" width="100px" />{" "}
          <Skeleton height="20px" width="100px" />
        </div>
      </Box>
      <Box padding="6" boxShadow="lg" bg="white">
        <Skeleton height="170px" />
        <SkeletonText mt="3" noOfLines={3} spacing="3" skeletonHeight="5" />
        <div className="flex items-center gap-4">
          <SkeletonCircle size="8" mt="2" />{" "}
          <Skeleton height="20px" width="100px" />{" "}
          <Skeleton height="20px" width="100px" />
        </div>
      </Box>
      <Box padding="6" boxShadow="lg" bg="white">
        <Skeleton height="170px" />
        <SkeletonText mt="3" noOfLines={3} spacing="3" skeletonHeight="5" />
        <div className="flex items-center gap-4">
          <SkeletonCircle size="8" mt="2" />{" "}
          <Skeleton height="20px" width="100px" />{" "}
          <Skeleton height="20px" width="100px" />
        </div>
      </Box>
      <Box padding="6" boxShadow="lg" bg="white">
        <Skeleton height="170px" />
        <SkeletonText mt="3" noOfLines={3} spacing="3" skeletonHeight="5" />
        <div className="flex items-center gap-4">
          <SkeletonCircle size="8" mt="2" />{" "}
          <Skeleton height="20px" width="100px" />{" "}
          <Skeleton height="20px" width="100px" />
        </div>
      </Box>
    </div>
  );
};

export default CardSkeleton;
