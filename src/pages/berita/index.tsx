import { Box, Stack } from "@chakra-ui/react";

import { Hero } from "~/src/components/Berita/BeritaIndex";
import { Navbar } from "~/src/components/UI";

const Berita: React.FC = () => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Hero />
    </Box>
  );
};

export default Berita;
