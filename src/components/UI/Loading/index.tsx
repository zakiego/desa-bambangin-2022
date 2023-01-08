import { Box } from "@chakra-ui/react";

import { PageWrapper } from "../../Layout";
import { LoadingStyle } from "./style";

export const Loading = () => {
  return (
    <PageWrapper title="Loading | Portal Desa Bambangin">
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
    </PageWrapper>
  );
};
