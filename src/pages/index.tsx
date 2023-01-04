import { Stack } from "@chakra-ui/react";

import { Navbar } from "~/src/components/UI";

import { PageWrapper } from "../components/Layout";

const Index: React.FC = () => {
  return (
    <PageWrapper title="Portal Desa Bambangin">
      <Stack minH="100vh" bg="blue.800">
        <Navbar />
      </Stack>
    </PageWrapper>
  );
};

export default Index;
