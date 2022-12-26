import { Stack } from "@chakra-ui/react";

import { Navbar } from "~/src/components/UI";

const Index: React.FC = () => {
  return (
    <Stack minH="100vh" bg="blue.800">
      <Navbar />
    </Stack>
  );
};

export default Index;
