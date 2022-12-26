import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Code,
  Container,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import NextImage from "next/image";

import { trpc } from "~/src/utils/trpc";

export default function Index() {
  const hello = trpc.hello.useQuery({ text: "client" });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
    </div>
  );
}
