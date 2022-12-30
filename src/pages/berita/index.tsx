import { Box, Container } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";

import {
  Hero,
  ListBerita,
  PaginationBerita,
} from "~/src/components/Berita/BeritaIndex";
import { Footer, Navbar } from "~/src/components/UI";
import { trpc } from "~/src/utils/trpc";

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { page } = context.query as {
    page?: string;
  };

  if (!page) {
    return {
      redirect: {
        destination: "/berita?page=1",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Berita: React.FC =  () => {

  // const { data  } =  await trpc.post.getAllPosts.useQuery();

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Hero />
      <Container maxW="container.xl" py="10">
        {/* <SearchBerita />
        <Box py="7">
          <Box w="full" h="0.5" bg="gray.200" rounded="md" />
        </Box> */}

        <ListBerita />
        <PaginationBerita totalPage={10} />
      </Container>
      <Footer />
    </Box>
  );
};

export default Berita;
