import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface Props {
  totalPage: number;
}

export const PaginationBerita: React.FC<Props> = ({ totalPage }) => {
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
        disabled={!(page > 1)}
        onClick={handlePrev}
        colorScheme="orange"
        variant="outline"
        leftIcon={<ChevronLeftIcon />}
        size="md"
      >
        Sebelumnya
      </Button>
      <Spacer />

      <Button
        disabled={!(page < totalPage)}
        onClick={handleNext}
        colorScheme="orange"
        variant="outline"
        rightIcon={<ChevronRightIcon />}
        size="md"
      >
        Selanjutnya
      </Button>
    </HStack>
  );
};
