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
import Link from "next/link";

import { trpc } from "~/src/utils/trpc";

interface Props {
  image: string;
}

export const Hero: React.FC<Props> = ({ image }) => {
  // const { data } = trpc.berita.getAll.useQuery();

  // const image = data?.edges[1].node.featuredImage?.node.sourceUrl;
  // const title = data?.edges[1].node.title;
  // const slug = data?.edges[1].node.slug;

  return (
    <Box
      bg="red"
      h="xl"
      backgroundImage={image}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="bottom"
    >
      <Container maxW="container.xl" h="full">
        <Stack h="full" py="5">
          <Breadcrumb separator={<ChevronRightIcon />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Beranda</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Berita</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Spacer />
          {/* <Heading as="h1" fontSize="4xl" color="white" py="4" maxW="lg">
            {title}
          </Heading> */}

          {/* <Link href={`berita/${slug}`}>
            <Button variant="outline" maxW="fit-content">
              <Text fontSize="md" color="white">
                Baca Selengkapnya
              </Text>
            </Button>
          </Link> */}

          {/* <Code>{JSON.stringify(image)}</Code> */}
        </Stack>
      </Container>
    </Box>
  );
};
