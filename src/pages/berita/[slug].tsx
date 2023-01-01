import { Box, Container, Spacer, Stack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

import { AnotherNews, Body, Hero } from "~/src/components/Berita/BeritaSlug";
import { CodeString, Footer, Navbar } from "~/src/components/UI";
import { trpc } from "~/src/utils/trpc";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as {
    slug: string;
  };

  return {
    props: { slug },
  };
};

interface Props {
  slug: string;
}

const BeritaSlug: React.FC<Props> = ({ slug }) => {
  const { data } = trpc.post.getPostDetail.useQuery({ slug });
  const { data: anotherNews } = trpc.post.getAllPosts.useQuery({
    page: 1,
    category: "berita",
    limit: 3,
  });

  if (!data || !anotherNews) {
    return (
      <div>
        {/* <CodeString code={data} /> */}
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Stack minH="100vh" bg="gray.50" spacing="0">
      <Navbar />
      <Hero
        title={data?.post_title}
        date={data?.post_date}
        thumbnail={data?.thumbnail}
      />
      {/* <CodeString code={data} /> */}
      <Box pt="10" pb="10">
        <Container maxW="container.xl">
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "0", md: "16" }}
          >
            <Box w={{ base: "100%", md: "70%" }}>
              <Body content={data.post_content} />
            </Box>
            <Box w={{ base: "100%", md: "30%" }} pt="6">
              <AnotherNews data={anotherNews.posts} />
            </Box>
          </Stack>
        </Container>
      </Box>
      <Spacer />
      <Footer />
    </Stack>
  );
};

export default BeritaSlug;
