import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Button,
  Code,
  Container,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

import { trpc } from "~/src/utils/trpc";

export const Hero = () => {
  // const { data } = trpc.berita.getAll.useQuery();

  // const image = data?.edges[1].node.featuredImage?.node.sourceUrl;
  // const title = data?.edges[1].node.title;
  const dummyHeroImage =
    "https://images.unsplash.com/photo-1664889167950-50b456b0e61c";

  const dummyTitle =
    "Potensi Perkebunan Jeruk di Desa Bambangin: Sebuah Analisis";

  const imageGradient = `
     linear-gradient(
        180deg,
        rgba(32, 17, 0, 0.34) 0%,
        rgba(32, 17, 0, 0.88) 100%
        )
        `;

  return (
    <Box
      h="md"
      background={`${imageGradient},url(${dummyHeroImage})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Container maxW="container.xl" h="full">
        <Stack h="full" py="5">
          <Breadcrumb separator={<ChevronRightIcon />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/berita">Berita</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Spacer />
          <Heading as="h1" fontSize="4xl" color="white" py="4" maxW="lg">
            {dummyTitle}
          </Heading>
        </Stack>
      </Container>
    </Box>
  );
};
