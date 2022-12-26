import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <Box bg="white">
      <Container maxW="container.xl" py="2">
        <HStack>
          <Stack>
            <Heading fontSize="lg">Desa Bambangin</Heading>
          </Stack>
          <Spacer />
          <HStack>
            <Button variant="ghost" fontSize="md">
              Home
            </Button>
            <Link href="/berita">
              <Button variant="ghost" fontSize="md">
                Berita Bambangin
              </Button>
            </Link>
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
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
