import { Box, Stack, Text } from "@chakra-ui/react";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import superjson from "superjson";

import { Hero } from "~/src/components/Berita/BeritaIndex";
import { Navbar } from "~/src/components/UI";
import { appRouter } from "~/src/server/routes/_app";
import { trpc } from "~/src/utils/trpc";

const Berita: React.FC = (props) => {
  const { data } = trpc.berita.getAll.useQuery();

  const image = data?.edges[1].node.featuredImage?.node.sourceUrl;

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Hero image={image} />
      {/* <Text>{JSON.stringify(data)}</Text> */}
    </Box>
  );
};

export default Berita;

export async function getStaticProps() {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  });

  // prefetch `post.byId`
  await ssg.berita.getAll.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
}
