import { Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

import { Body, Hero } from "~/src/components/Berita/BeritaSlug";
import { Navbar } from "~/src/components/UI";

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
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Hero />
      <Body slug={slug} />
    </Box>
  );
};

export default BeritaSlug;
