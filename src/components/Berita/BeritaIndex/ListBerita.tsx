import {
  Box,
  // Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";

import { GetAllPosts } from "~/src/server/routes/post";
import getImage from "~/src/utils/getImage";

interface Props {
  berita: Array<Berita>;
}

export type Berita = Omit<GetAllPosts["posts"], "post_date"> & {
  post_date: string;
};

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

const BeritaCard: React.FC<Berita> = ({
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
            src={thumbnail ? getImage(thumbnail) : dummyListBerita[0].image}
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

const dummyListBerita = [
  {
    title: "Kebakaran Hutan Amazon Terus Berlangsung",
    content:
      "Kebakaran hutan Amazon telah terjadi sejak bulan Agustus lalu dan belum juga terkendali hingga saat ini. Kebakaran ini telah merusak ekosistem hutan Amazon dan mengancam keberlangsungan hidup ribuan spesies yang hidup di sana. Pemerintah Brasil telah mengeluarkan pernyataan bahwa kebakaran ini disebabkan oleh cuaca yang kering dan tidak ada hubungannya dengan kegiatan manusia. Namun, beberapa pihak menyatakan bahwa kebakaran ini disebabkan oleh kegiatan perusahaan-perusahaan yang membuka lahan baru untuk pertanian atau perkebunan.",
    date: "27 Desember 2022",
    image: "https://images.unsplash.com/photo-1559628233-100c798642d4",
  },
  {
    title: "Gempa Bumi di Indonesia Timur",
    content:
      "Gempa bumi berkekuatan 6,2 SR terjadi pada pukul 22.30 WITA tadi malam di Indonesia Timur. Gempa ini tidak menyebabkan kerusakan atau korban jiwa. Menurut Badan Meteorologi, Klimatologi, dan Geofisika (BMKG), gempa ini tidak berpotensi tsunami. Gempa bumi merupakan hal yang biasa terjadi di Indonesia yang terletak di atas lempeng tektonik.",
    date: "28 Desember 2022",
    image: "https://images.unsplash.com/photo-1533339577339-9007cb316e9c",
  },
  {
    title: "Kebakaran Hutan Amazon Terus Berlangsung",
    content:
      "Kebakaran hutan Amazon telah terjadi sejak bulan Agustus lalu dan belum juga terkendali hingga saat ini. Kebakaran ini telah merusak ekosistem hutan Amazon dan mengancam keberlangsungan hidup ribuan spesies yang hidup di sana. Pemerintah Brasil telah mengeluarkan pernyataan bahwa kebakaran ini disebabkan oleh cuaca yang kering dan tidak ada hubungannya dengan kegiatan manusia. Namun, beberapa pihak menyatakan bahwa kebakaran ini disebabkan oleh kegiatan perusahaan-perusahaan yang membuka lahan baru untuk pertanian atau perkebunan.",
    date: "27 Desember 2022",
    image: "https://images.unsplash.com/photo-1559628233-100c798642d4",
  },
  {
    title: "Gempa Bumi di Indonesia Timur",
    content:
      "Gempa bumi berkekuatan 6,2 SR terjadi pada pukul 22.30 WITA tadi malam di Indonesia Timur. Gempa ini tidak menyebabkan kerusakan atau korban jiwa. Menurut Badan Meteorologi, Klimatologi, dan Geofisika (BMKG), gempa ini tidak berpotensi tsunami. Gempa bumi merupakan hal yang biasa terjadi di Indonesia yang terletak di atas lempeng tektonik.",
    date: "28 Desember 2022",
    image: "https://images.unsplash.com/photo-1533339577339-9007cb316e9c",
  },
  {
    title: "Kebakaran Hutan Amazon Terus Berlangsung",
    content:
      "Kebakaran hutan Amazon telah terjadi sejak bulan Agustus lalu dan belum juga terkendali hingga saat ini. Kebakaran ini telah merusak ekosistem hutan Amazon dan mengancam keberlangsungan hidup ribuan spesies yang hidup di sana. Pemerintah Brasil telah mengeluarkan pernyataan bahwa kebakaran ini disebabkan oleh cuaca yang kering dan tidak ada hubungannya dengan kegiatan manusia. Namun, beberapa pihak menyatakan bahwa kebakaran ini disebabkan oleh kegiatan perusahaan-perusahaan yang membuka lahan baru untuk pertanian atau perkebunan.",
    date: "27 Desember 2022",
    image: "https://images.unsplash.com/photo-1559628233-100c798642d4",
  },
];
