import { Code, Container, Stack } from "@chakra-ui/react";

import { trpc } from "~/src/utils/trpc";

interface Props {
  slug: string;
}

export const Body: React.FC<Props> = ({ slug }) => {
  const { data } = trpc.berita.getDetail.useQuery({ slug });

  const content = data?.edges[0].node.content;

  return (
    <Stack>
      <Container maxW="container.md">
        <div
          // className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Container>
    </Stack>
  );
};
