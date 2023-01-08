import "~/src/styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Provider as BalancerProvider } from "react-wrap-balancer";

import theme from "~/src/styles/theme";
import { trpc } from "~/src/utils/trpc";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color={theme.colors.primary[500]}
        options={{ showSpinner: false }}
      />
      <BalancerProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </BalancerProvider>
    </>
  );
}

export default trpc.withTRPC(MyApp);
