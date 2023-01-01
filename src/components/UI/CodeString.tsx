import { Box, Container } from "@chakra-ui/react";
import { CodeBlock, dracula } from "react-code-blocks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CodeString = (code: any) => {
  return (
    <Box py="4">
      <Container maxW="container.xl">
        <CodeBlock
          text={JSON.stringify(code, null, 4)}
          language="JSON"
          theme={dracula}
        />
      </Container>
    </Box>
  );
};
