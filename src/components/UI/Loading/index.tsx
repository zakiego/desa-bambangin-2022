import { Box } from "@chakra-ui/react";

import { LoadingStyle } from "./style";

export const Loading = () => {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      display="flex"
      minH="100vh"
    >
      <LoadingStyle>
        <Box className="dot-flashing" />
      </LoadingStyle>
    </Box>
  );
};
