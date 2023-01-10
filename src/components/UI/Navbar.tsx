import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const listMobileMenu = [
  { name: "Beranda", href: "/" },
  { name: "Berita Bambangin", href: "/berita" },
  { name: "Profil Desa", href: "/profil-desa" },
  // { name: "Sejarah Bambangin", href: "/sejarah" },
];

export const Navbar = () => {
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
                src="/static/icon/bambangin-white.svg"
                width={180}
                height={50}
                alt="Bambangin Icon"
                priority
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
      <Link href="/profil-desa">
        <Button variant="navbar" fontSize="md">
          Profil Bambangin
        </Button>
      </Link>
      {/* <Menu>
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
      </Menu> */}
    </HStack>
  );
};
