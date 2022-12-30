import { Box, Spacer, Stack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

import { Body, Hero } from "~/src/components/Berita/BeritaSlug";
import { Footer, Navbar } from "~/src/components/UI";

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
  return (
    <Stack minH="100vh" bg="gray.50" spacing="0">
      <Navbar />
      <Hero />
      <Body slug={slug} />
      <Spacer />
      <Footer />
    </Stack>
  );
};

export default BeritaSlug;
