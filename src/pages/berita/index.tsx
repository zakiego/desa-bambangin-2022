import { Box, Container, Text } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";

import {
  Hero,
  ListBerita,
  PaginationBerita,
} from "~/src/components/Berita/BeritaIndex";
import { Footer, Navbar } from "~/src/components/UI";
import { GetAllPosts } from "~/src/server/routes/post";
import { PaginationData } from "~/src/utils/pagination";
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
    props: {
      page: parseInt(page),
    },
  };
};

interface Props {
  page: number;
}

const Berita: React.FC<Props> = ({ page }) => {
  const { data, isFetched } = trpc.post.getAllPosts.useQuery({
    page: page,
    category: "berita",
  }) as {
    data: {
      posts: GetAllPosts["posts"][];
      paging: PaginationData;
    };
    isFetched: boolean;
  };

  if (!data) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Navbar />
        <Hero />

        <Container maxW="container.xl" py="10">
          <Text>Loading...</Text>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Hero />

      <Container maxW="container.xl" py="10">
        {/* <SearchBerita />
        <Box py="7">
          <Box w="full" h="0.5" bg="gray.200" rounded="md" />
        </Box> */}

        <ListBerita berita={data?.posts} />
        <PaginationBerita {...data?.paging} />
      </Container>
      <Footer />
    </Box>
  );
};

export default Berita;
