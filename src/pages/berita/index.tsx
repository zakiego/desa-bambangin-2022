import { Box, Container } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";

import {
  Hero,
  ListBerita,
  PaginationBerita,
} from "~/src/components/Berita/BeritaIndex";
import { PageWrapper } from "~/src/components/Layout";
import { Error, Footer, Loading, Navbar } from "~/src/components/UI";
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
  const { data, isError } = trpc.post.getAllPosts.useQuery({
    page: page,
    category: "berita",
  });

  if (isError) {
    return <Error />;
  }

  if (!data) {
    return <Loading />;
  }

  const heroData = data.posts[0];

  return (
    <PageWrapper title="Berita | Portal Desa Bambangin">
      <Box minH="100vh" bg="gray.50">
        <Navbar />
        <Hero
          title={heroData.post_title}
          image={heroData.thumbnail}
          date={heroData.post_date}
          slug={heroData.post_name}
        />
        <Container maxW="container.xl" py="10">
          <ListBerita berita={data?.posts} />
          <PaginationBerita {...data?.paging} />
        </Container>
        <Footer />
      </Box>
    </PageWrapper>
  );
};

export default Berita;
