import {
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";

import { PageWrapper } from "../Layout";

export const Error = () => {
  return (
    <PageWrapper title="Error | Portal Desa Bambangi">
      <Flex minH="100vh" alignItems="center" justify="center" mt="-16">
        <Container maxW="container.xl" h="full">
          <VStack h="full" spacing="4">
            <Image
              src="/static/images/error.svg"
              width={300}
              height={70}
              alt="Error"
            />
            <Heading pt="6" color="#FFD3F8">
              Oops maaf! {":("}
            </Heading>
            <Text
              color="blackAlpha.800"
              textAlign="center"
              fontSize={{ base: "md", md: "lg" }}
            >
              Terjadi kesalahan. Silakan muat ulang halaman atau coba lagi
              nanti.
            </Text>
          </VStack>
        </Container>
      </Flex>
    </PageWrapper>
  );
};
