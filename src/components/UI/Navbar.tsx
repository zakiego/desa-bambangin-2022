import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
  }, []);

  // const bgColor = scrollPosition > 550 ? "primary.500" : "transparent";

  return (
    <Box
      bg="transparent"
      position="fixed"
      w="full"
      backdropFilter="blur(30px)"
      zIndex="100"
    >
      <Container maxW="container.xl" py="4">
        <HStack>
          <Box>
            <Image
              src={"/static/icon/bambangin-white.svg"}
              h="12"
              alt="Bambangin Icon"
            />
          </Box>
          <Spacer />
          <HStack>
            <Button variant="navbar" fontSize="md">
              Beranda
            </Button>
            <Link href="/berita">
              <Button variant="navbar" fontSize="md">
                Berita Bambangin
              </Button>
            </Link>
            <Menu>
              <MenuButton
                as={Button}
                variant="navbar"
                rightIcon={<ChevronDownIcon />}
              >
                Profil Bambangin
              </MenuButton>
              <MenuList>
                <MenuItem>Tentang Bambangin</MenuItem>
                <MenuItem>Sejarah Bambangin</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};
