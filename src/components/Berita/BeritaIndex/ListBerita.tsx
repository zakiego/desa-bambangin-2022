import { Box, Stack, Text } from "@chakra-ui/react";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";

import { DUMMY_IMAGE } from "~/src/lib/constans";
import { GetAllPosts } from "~/src/server/routes/post";
import getImage from "~/src/utils/getImage";

interface Props {
  berita: GetAllPosts["posts"][];
}

export const ListBerita: React.FC<Props> = ({ berita }) => {
  return (
    <Box
    // w="60%"
    >
      <Stack spacing="6">
        {berita.slice(1, 5).map((berita, id) => {
          return <BeritaCard key={id} {...berita} />;
        })}
      </Stack>
    </Box>
  );
};

const BeritaCard: React.FC<GetAllPosts["posts"]> = ({
  post_title,
  post_content,
  post_date,
  post_name,
  thumbnail,
}) => {
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
        <Box
          w={{ base: "30%", md: "20%" }}
          h="32"
          borderRadius="md"
          position="relative"
        >
          <Image
            src={thumbnail ? getImage(thumbnail) : DUMMY_IMAGE}
            fill
            quality={30}
            alt={`image ${post_name}`}
            style={{
              objectFit: "cover",
              borderRadius: "0.375rem",
            }}
          />
        </Box>
        <Stack w={{ base: "70%", md: "80%" }}>
          <Text
            fontSize={{ base: "md", md: "xl" }}
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
          <Text fontSize={{ base: "xs", md: "md" }} color="gray.500">
            {new Date(post_date).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <Box
            fontSize="sm"
            color="gray.500"
            noOfLines={{ base: 2, md: 3 }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post_content),
            }}
          />
        </Stack>
      </Stack>
    </Link>
  );
};
