import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

export const Hero: React.FC = () => {
  const dummyHeroImage1 =
    "https://images.unsplash.com/photo-1442544213729-6a15f1611937";
  const dummyHeroImage2 =
    "https://images.unsplash.com/photo-1664889167950-50b456b0e61c";
  const dummyHeroImage3 =
    "https://images.unsplash.com/photo-1601122929266-9af28ad4e8a7";

  const dummyTitle1 =
    "Potensi Perkebunan Jeruk di Desa Bambangin: Sebuah Analisis";

  // const imageGradient1 = `
  //     linear-gradient(
  //       180deg,
  //       rgba(15, 40, 82, 0.34) 1.3%,
  //       rgba(15, 40, 82, 0.91)
  //       100%
  //       )
  //       `;

  // const imageGradient2 = `
  //    linear-gradient(
  //       180deg,
  //       rgba(224, 165, 42, 0.11) 1.3%,
  //       rgba(255, 141, 8, 0.51)
  //       100%
  //       )
  //       `;

  // const imageGradient = `
  //    linear-gradient(
  //       180deg,
  //       rgba(220, 159, 31, 0.11) 1.3%,
  //       rgba(102, 55, 0, 0.76)
  //       100%
  //       )
  //       `;

  const imageGradient = `
     linear-gradient(
        180deg,
        rgba(32, 17, 0, 0.34) 0%,
        rgba(32, 17, 0, 0.88) 100%
        )
        `;

  return (
    <Box
      h="xl"
      background={`${imageGradient},url(${dummyHeroImage2})`}
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
              <BreadcrumbLink href="#">Berita</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Spacer />

          <Balancer>
            <Heading as="h1" fontSize="4xl" color="white">
              {dummyTitle1}
            </Heading>
          </Balancer>

          <Text color="whiteAlpha.700" pb="7">
            Selasa, 12 Januari 2022
          </Text>

          <Link href="#">
            <Button
              variant="outline"
              maxW="fit-content"
              _hover={{ bg: "whiteAlpha.200" }}
              _active={{ bg: "whiteAlpha.300" }}
            >
              <Text fontSize="md" color="white">
                Baca Selengkapnya
              </Text>
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};
