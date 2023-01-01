import { Prose } from "@nikolovlazar/chakra-ui-prose";

interface Props {
  content: string;
}

export const Body: React.FC<Props> = ({ content }) => {
  // const removeFirstN = content.replace(`\n`, "");

  return <Prose dangerouslySetInnerHTML={{ __html: content }} />;
};
