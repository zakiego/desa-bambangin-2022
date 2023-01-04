import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const listMobileMenu = [
  { name: "Beranda", href: "/" },
  { name: "Berita Bambangin", href: "/berita" },
  { name: "Profil Desa", href: "/profil-desa" },
  { name: "Sejarah Bambangin", href: "/sejarah" },
];

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
      bg="blackAlpha.500"
      position="fixed"
      w="full"
      backdropFilter="blur(30px)"
      zIndex="100"
    >
      <Container maxW="container.xl" py="4">
        <HStack>
          <Box>
            <Link href="/">
              <Image
                src={"/static/icon/bambangin-white.svg"}
                h="12"
                alt="Bambangin Icon"
              />
            </Link>
          </Box>
          <Spacer />
          <RightDesktop />
          <RightMobile />
        </HStack>
      </Container>
    </Box>
  );
};

const RightMobile = () => {
  return (
    <Box display={{ base: "block", md: "none" }}>
      <Menu>
        <MenuButton as={IconButton} variant="navbar" icon={<HamburgerIcon />} />
        <MenuList>
          {listMobileMenu.map((item, index) => (
            <Link key={index} href={item.href}>
              <MenuItem>{item.name}</MenuItem>
            </Link>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

const RightDesktop = () => {
  return (
    <HStack display={{ base: "none", md: "block" }}>
      <Link href="/">
        <Button variant="navbar" fontSize="md">
          Beranda
        </Button>
      </Link>
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
          <Link href="/profil-desa">
            <MenuItem>Profil Desa</MenuItem>
          </Link>
          <MenuItem>Sejarah Bambangin</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};
