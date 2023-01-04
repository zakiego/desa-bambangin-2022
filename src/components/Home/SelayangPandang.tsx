import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { GoChevronRight } from "react-icons/go";
import Balancer from "react-wrap-balancer";

export const SelayangPandang = () => {
  return (
    <Box bg="gray.50" px={{ base: "6", md: 0 }} pb="8">
      <Container
        maxW="container.xl"
        position="relative"
        zIndex="10"
        w="full"
        mt={{ base: "-16", md: "-20" }}
        rounded="md"
        px="6"
        py="6"
        bg="white"
      >
        <Stack w={{ base: "100%", md: "70%" }} spacing="6">
          <Heading
            as="h3"
            size={{ base: "md", md: "lg" }}
            color="blackAlpha.800"
          >
            Selayang Pandang
          </Heading>
          <Text lineHeight="tall" color="blackAlpha.700">
            <Balancer>
              Desa Bambangin merupakan sebuah desa yang terletak di Kabupaten
              Barito Kuala, Provinsi Kalimantan Selatan. Desa ini memiliki
              kebudayaan yang kental dan mayoritas penduduknya adalah keturunan
              Gusti. Kebudayaan yang kental ini dapat terlihat dari banyaknya
              adat istiadat yang masih terjaga hingga sekarang, serta
              keberlangsungan tradisi yang masih dijalankan oleh masyarakat Desa
              Bambangin.
            </Balancer>
          </Text>
          <Text
            lineHeight="tall"
            display={{ base: "none", md: "block" }}
            color="blackAlpha.700"
          >
            <Balancer>
              Selain memiliki kebudayaan yang kental, Desa Bambangin juga
              memiliki potensi jeruk yang besar. Potensi ini merupakan salah
              satu sumber penghasilan utama bagi masyarakat desa ini. Jeruk yang
              diproduksi di Desa Bambangin merupakan jeruk yang terkenal dengan
              rasanya yang manis dan segar. Masyarakat Desa Bambangin juga
              terkenal dengan kemampuannya dalam mengelola pertanian, terutama
              dalam hal pengolahan jeruk.
            </Balancer>
          </Text>

          <Link href="/profil-desa">
            <Button
              w="max-content"
              size="sm"
              variant="solid"
              bg="primary.400"
              color="white"
              _hover={{
                bg: "primary.500",
              }}
              _active={{
                bg: "primary.500",
              }}
            >
              Baca Selengkapnya <GoChevronRight />
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};
