import { Box, Container, Spacer, Stack } from "@chakra-ui/react";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import superjson from "superjson";

import { AnotherNews, Body, Hero } from "~/src/components/Berita/BeritaSlug";
import { PageWrapper } from "~/src/components/Layout";
import { Error, Footer, Loading, Navbar } from "~/src/components/UI";
import { REVALIDATE_WP_POSTS } from "~/src/lib/constans";
import { prisma } from "~/src/server/prisma";
// import { prisma } from "~/src/lib/prisma";
import { appRouter } from "~/src/server/routes/_app";
import { GetAllPosts } from "~/src/server/routes/post";
import { trpc } from "~/src/utils/trpc";

const BeritaSlug: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  slug,
}) => {
  if (!slug) {
    return <Loading />;
  }

  const { data, isError: errorPostDetail } = trpc.post.getPostDetail.useQuery({
    slug,
  });

  const { data: anotherNews, isError: errorAllPost } =
    trpc.post.getAllPosts.useQuery({
      category: "berita",
      limit: 1000,
      page: 1,
    });

  if (errorPostDetail || errorAllPost) {
    return <Error />;
  }

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

export const getStaticPaths: GetStaticPaths = async () => {
  const allBerita = await prisma.$queryRaw<GetAllPosts["posts"][]>`
      SELECT
          SQL_CALC_FOUND_ROWS
          wp_posts.post_title,
          wp_posts.post_name,
          wp_posts.post_content,
          wp_posts.post_date,
          wp_terms.name,
          wp_terms.slug,
          wp_users.display_name,
          wpm2.meta_value as thumbnail
       FROM wp_posts
          JOIN wp_term_relationships on wp_posts.ID = wp_term_relationships.object_id
          JOIN wp_terms on wp_term_relationships.term_taxonomy_id = wp_terms.term_id
          JOIN wp_term_taxonomy on wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id
          JOIN wp_users on wp_posts.post_author = wp_users.ID
          LEFT JOIN wp_postmeta wpm
             ON (wp_posts.ID = wpm.post_id AND wpm.meta_key = '_thumbnail_id')
          LEFT JOIN wp_postmeta wpm2
            ON (wpm.meta_value = wpm2.post_id AND wpm2.meta_key = '_wp_attached_file')
       WHERE wp_posts.post_status = 'publish'
       ORDER BY wp_posts.post_date DESC`;

  if (!allBerita) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const allBeritaSlug = allBerita.map((post) => ({
    params: {
      slug: post.post_name,
    },
  }));

  return {
    paths: allBeritaSlug,
    fallback: true,
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>,
) {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  });

  const slug = context.params?.slug as string;

  console.log("Slug : ", slug);

  await ssg.post.getPostDetail.prefetch({ slug });
  await ssg.post.getAllPosts.prefetch({
    category: "berita",
    limit: 1000,
    page: 1,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
    revalidate: REVALIDATE_WP_POSTS,
  };
}
