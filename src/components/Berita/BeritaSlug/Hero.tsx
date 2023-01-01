import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

import dateToIndonesiaFormat from "~/src/utils/date";
import getImage from "~/src/utils/getImage";

interface Props {
  title: string;
  date: string;
  thumbnail: string | null;
}

export const Hero: React.FC<Props> = ({ title, date, thumbnail }) => {
  const dummyHeroImage =
    "https://images.unsplash.com/photo-1664889167950-50b456b0e61c";

  const heroImage = thumbnail ? getImage(thumbnail) : dummyHeroImage;

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
      background={`${imageGradient},url(${heroImage})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Container maxW="container.xl" h="full">
        <Stack h="full" pt="28" pb="10" spacing="2">
          <Breadcrumb>
            <BreadcrumbItem color="white">
              <BreadcrumbLink href="/" color="primary.500">
                Beranda
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem color="white">
              <BreadcrumbLink href="/berita">Berita</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Spacer />

          <Heading as="h1" fontSize="4xl" color="white" pb="2" maxW="lg">
            {title}
          </Heading>
          <Text color="whiteAlpha.800">{dateToIndonesiaFormat(date)}</Text>
        </Stack>
      </Container>
    </Box>
  );
};
