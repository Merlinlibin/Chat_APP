import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height="65px" />
      <Skeleton height="65px" />
      <Skeleton height="65px" />
      <Skeleton height="65px" />
      <Skeleton height="65px" />
    </Stack>
  );
};

export default ChatLoading;
