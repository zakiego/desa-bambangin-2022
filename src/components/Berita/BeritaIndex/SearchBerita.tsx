import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

export const SearchBerita = () => {
  return (
    <Box>
      <Heading color="gray.900" pb="5" size="lg">
        Berita Desa Bambangin
      </Heading>
      <Box w="50%">
        <InputGroup>
          <Input placeholder="Cari Berita" focusBorderColor="primary.200" />
          <InputRightElement>
            {<SearchIcon color="gray.500" />}
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  );
};
