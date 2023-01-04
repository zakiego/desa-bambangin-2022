import { Box, Container, Spacer, Stack } from "@chakra-ui/react";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import {} from "next";
import superjson from "superjson";

import { Body, Hero } from "~/src/components/Berita/BeritaSlug";
import { PageWrapper } from "~/src/components/Layout";
import { Footer, Loading, Navbar } from "~/src/components/UI";
import { appRouter } from "~/src/server/routes/_app";
import { trpc } from "~/src/utils/trpc";

import { REVALIDATE_WP_POSTS_EVERY_5_MINUTES } from "../lib/constans";

const ProfildDesa = () => {
  const postQuery = trpc.post.getPostDetail.useQuery({ slug: "profil-desa" });

  if (postQuery.status !== "success") {
    return <Loading />;
  }

  const { data } = postQuery;

  return (
    <PageWrapper title="Profil Desa Bambangin | Portal Desa Bambangin">
      <Stack minH="100vh" bg="gray.50" spacing="0">
        <Navbar />
        <Hero
          title={data?.post_title}
          date={data?.post_date}
          thumbnail={data?.thumbnail}
        />
        <Box pt="10" pb="10">
          <Container maxW="container.xl">
            <Box>
              <Body content={data.post_content} />
            </Box>
          </Container>
        </Box>
        <Spacer />
        <Footer />
      </Stack>
    </PageWrapper>
  );
};

export default ProfildDesa;

export async function getStaticProps() {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });

  await ssg.post.getPostDetail.prefetch({ slug: "profil-desa" });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: REVALIDATE_WP_POSTS_EVERY_5_MINUTES,
  };
}
