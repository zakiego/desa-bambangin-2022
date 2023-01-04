import { Box, Container, Spacer, Stack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

import { AnotherNews, Body, Hero } from "~/src/components/Berita/BeritaSlug";
import { PageWrapper } from "~/src/components/Layout";
import { Footer, Loading, Navbar } from "~/src/components/UI";
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
    category: "berita",
    limit: 1000,
    page: 1,
  });

  if (!data || !anotherNews) {
    return <Loading />;
  }

  const pick3RandomAnotherNewsWithoutSlug = () => {
    const filtered = anotherNews.posts.filter(
      (post) => post.post_name !== slug,
    );
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  return (
    <PageWrapper title={`${data.post_title} - Berita | Portal Desa Bambangin`}>
      <Stack minH="100vh" bg="gray.50" spacing="0">
        <Navbar />
        <Hero
          title={data?.post_title}
          date={data?.post_date}
          thumbnail={data?.thumbnail}
        />
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
                <AnotherNews data={pick3RandomAnotherNewsWithoutSlug()} />
              </Box>
            </Stack>
          </Container>
        </Box>
        <Spacer />
        <Footer />
      </Stack>
    </PageWrapper>
  );
};

export default BeritaSlug;
