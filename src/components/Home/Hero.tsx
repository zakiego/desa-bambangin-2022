import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { GoLocation } from "react-icons/go";
import Balancer from "react-wrap-balancer";

export const HeroHome = () => {
  return (
    <Box>
      <Box h="80vh" position="relative">
        <Box
          bg={`${imageGradient}`}
          zIndex="1"
          h="full"
          w="full"
          position="absolute"
        />

        <Box>
          <Image
            src="/static/images/DSC04208.JPG"
            alt="Hero"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          position="absolute"
          bottom={{ base: "24%", md: "25%" }}
          w="full"
          zIndex="10"
        >
          <Container maxW="container.xl">
            <Stack>
              <Heading color="white" size="3xl">
                Desa Bambangin
              </Heading>
              <Box pt="4">
                <Text color="white" fontSize={{ base: "md", md: "xl" }}>
                  <Balancer>
                    Sebuah desa yang dikenal sebagai <b>{`Desa Pagustian`}</b>{" "}
                    karena mayoritas penduduknya memiliki gelar <i>{`Gusti`}</i>
                  </Balancer>
                </Text>
              </Box>
              <Box pt="6">
                <Link href="/map">
                  <Button
                    variant="outline"
                    size="sm"
                    _hover={{
                      bg: "whiteAlpha.200",
                    }}
                    _active={{
                      bg: "whiteAlpha.300",
                    }}
                  >
                    <HStack>
                      <Icon as={GoLocation} h="3" color="whiteAlpha.800" />
                      <Text color="whiteAlpha.800" fontSize="sm">
                        Google Maps
                      </Text>
                    </HStack>
                  </Button>
                </Link>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

const imageGradient = `
     linear-gradient(
        180deg,
        rgba(32, 17, 0, 0.34) 0%,
        rgba(32, 17, 0, 0.88) 100%
        )
        `;
