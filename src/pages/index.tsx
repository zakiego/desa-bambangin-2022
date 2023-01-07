import { Stack } from "@chakra-ui/react";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import SuperJSON from "superjson";

import { HeroHome, Highlight, SelayangPandang } from "~/src/components/Home";
import { PageWrapper } from "~/src/components/Layout";
import { Error, Footer, Loading, Navbar } from "~/src/components/UI";
import { trpc } from "~/src/utils/trpc";

import { REVALIDATE_WP_POSTS } from "../lib/constans";
import { appRouter } from "../server/routes/_app";

export async function getStaticProps() {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: SuperJSON, // optional - adds superjson serialization
  });

  await ssg.post.getAllPosts.prefetch({
    page: 1,
    category: "berita",
    limit: 3,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: REVALIDATE_WP_POSTS,
  };
}

const Index: React.FC = () => {
  const { data, error } = trpc.post.getAllPosts.useQuery({
    page: 1,
    category: "berita",
    limit: 3,
  });

  if (error) {
    return <Error />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <PageWrapper title="Portal Desa Bambangin">
      <Stack minH="100vh" bg="gray.50" spacing="0">
        <Navbar />
        <HeroHome />
        <SelayangPandang />
        <Highlight berita={data.posts} />
        <Footer />
      </Stack>
    </PageWrapper>
  );
};

export default Index;
