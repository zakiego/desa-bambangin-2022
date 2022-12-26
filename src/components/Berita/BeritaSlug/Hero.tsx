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
  const { data } = trpc.berita.getAll.useQuery();

  const image = data?.edges[1].node.featuredImage?.node.sourceUrl;
  const title = data?.edges[1].node.title;

  return (
    <Box
      bg="red"
      h="md"
      backgroundImage={image}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="bottom"
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
            {title}
          </Heading>
        </Stack>
      </Container>
    </Box>
  );
};
