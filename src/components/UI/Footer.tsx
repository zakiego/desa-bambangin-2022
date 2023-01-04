import {
  Box,
  Container,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { GoLocation } from "react-icons/go";

export const Footer = () => {
  return (
    <VStack bg="primary.500" py="8">
      <Container maxW="container.xl">
        <Stack spacing="5">
          <Box>
            <Image
              src={"/static/icon/bambangin-white.svg"}
              h="12"
              alt="Bambangin Icon"
            />
          </Box>
          <Stack>
            <Text color="white">
              Desa Bambangin, Kecamatan Belawang, Kabupaten Barito Kuala,
              Provinsi Kalimantan Selatan
            </Text>
          </Stack>
          <Link href="/map">
            <HStack>
              <Icon as={GoLocation} h="5" color="white" />
              <Text color="white">Google Maps</Text>
            </HStack>
          </Link>
          <Text fontSize="sm" color="whiteAlpha.900">
            Copyright © 2023. All Rights Reserved.
          </Text>
        </Stack>
      </Container>
    </VStack>
  );
};
