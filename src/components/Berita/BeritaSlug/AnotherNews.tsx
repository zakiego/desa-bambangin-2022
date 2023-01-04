import { Box, Heading, Link, Stack, Text } from "@chakra-ui/react";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";

import getImage from "~/src/utils/getImage";

import { Berita } from "../BeritaIndex";

interface Props {
  data: Berita[];
}

export const AnotherNews: React.FC<Props> = ({ data }) => {
  return (
    <Box>
      <Heading fontSize="lg" color="blackAlpha.900">
        Berita Lainnya
      </Heading>

      <Stack spacing="6" pt="4">
        {data.map((berita, id) => {
          return <Card key={id} {...berita} />;
        })}
      </Stack>
    </Box>
  );
};

const Card: React.FC<Berita> = ({
  post_title,
  post_content,
  post_name,
  thumbnail,
}) => {
  const dummyImage =
    "https://images.unsplash.com/photo-1559628233-100c798642d4";

  return (
    <Link href={`/berita/${post_name}`}>
      <Stack
        p="2"
        spacing="4"
        alignItems="center"
        direction="row"
        bg="gray.50"
        w="full"
        borderRadius="md"
        _hover={{ cursor: "pointer", bg: "gray.100" }}
        data-component-name="BeritaCard"
      >
        <Box w="30%" h="24" borderRadius="md" position="relative">
          <Image
            src={thumbnail ? getImage(thumbnail) : dummyImage}
            fill
            quality={30}
            alt={`image ${post_name}`}
            style={{
              objectFit: "cover",
              borderRadius: "0.375rem",
            }}
          />
        </Box>
        <Stack w="60%">
          <Text
            fontSize="md"
            fontWeight="bold"
            color="gray.800"
            sx={{
              '[data-component-name="BeritaCard"]:hover &': {
                color: "primary.500",
              },
            }}
            noOfLines={2}
          >
            {post_title}
          </Text>

          <Box
            fontSize="sm"
            color="gray.500"
            noOfLines={2}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post_content),
            }}
          />
        </Stack>
      </Stack>
    </Link>
  );
};
