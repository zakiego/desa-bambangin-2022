import { Code, Container, Stack } from "@chakra-ui/react";

import { trpc } from "~/src/utils/trpc";
import { Prose } from "@nikolovlazar/chakra-ui-prose";

interface Props {
  slug: string;
}

export const Body: React.FC<Props> = ({ slug }) => {
  const { data } = trpc.berita.getDetail.useQuery({
    slug: "transformasi-digital-menuju-masa-depan-yang-lebih-cerah",
  });
  const { data: code } = trpc.berita.getAll.useQuery();

  const content = data?.edges[0].node.content;

  return (
    <Stack>
      <Container maxW="container.xl">
        {/* <div
          // className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        /> */}
        <Prose dangerouslySetInnerHTML={{ __html: content }} />
        {/* <Code>{JSON.stringify(code)}</Code> */}
      </Container>
    </Stack>
  );
};
