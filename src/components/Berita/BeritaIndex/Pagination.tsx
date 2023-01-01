import { Button, HStack, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import { PaginationData } from "~/src/utils/pagination";

export const PaginationBerita: React.FC<PaginationData> = ({
  total_data,
  max_page,
  has_prev,
  has_next,
}) => {
  const router = useRouter();
  const { query } = router;
  const page = parseInt(query.page as string);

  const handleNext = () => {
    const nextPage = page + 1;
    router.push({
      pathname: router.pathname,
      query: { ...query, page: nextPage },
    });
  };

  const handlePrev = () => {
    const prevPage = page - 1;
    router.push({
      pathname: router.pathname,
      query: { ...query, page: prevPage },
    });
  };

  return (
    <HStack pt="10">
      <Button
        disabled={!has_prev}
        onClick={handlePrev}
        colorScheme="orange"
        variant="outline"
        leftIcon={<GoChevronLeft />}
        size={{ base: "sm", md: "md" }}
      >
        Sebelumnya
      </Button>
      <Spacer />

      <Button
        disabled={!has_next}
        onClick={handleNext}
        colorScheme="orange"
        variant="outline"
        rightIcon={<GoChevronRight />}
        size={{ base: "sm", md: "md" }}
      >
        Selanjutnya
      </Button>
    </HStack>
  );
};
