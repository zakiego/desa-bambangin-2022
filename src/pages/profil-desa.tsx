import { Box, Container, Spacer, Stack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

import { AnotherNews, Body, Hero } from "~/src/components/Berita/BeritaSlug";
import { CodeString, Footer, Navbar } from "~/src/components/UI";
import { trpc } from "~/src/utils/trpc";

const ProfildDesa: React.FC = () => {
  const { data } = trpc.post.getPostDetail.useQuery({ slug: "profil-desa" });

  if (!data) {
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
          <Box>
            <Body content={data.post_content} />
          </Box>
        </Container>
      </Box>
      <Spacer />
      <Footer />
    </Stack>
  );
};

export default ProfildDesa;
