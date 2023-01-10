import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { withProse } from "@nikolovlazar/chakra-ui-prose";

const theme = extendTheme(
  {
    colors: {
      // create pallete 50-900 from and with "#FF8D07" color as 500
      primary: {
        50: "#FFF5E6",
        100: "#FFE8CC",
        200: "#FFD199",
        300: "#FFB966",
        400: "#FFA233",
        500: "#FF8D07",
        600: "#D66C06",
        700: "#A94F05",
        800: "#7A3204",
        900: "#4C1503",
      },

      legacy: {
        primary: {
          // create pallete 50-900 from and with "#0F80E7" color as 500
          50: "#E6F4FF",
          100: "#CCE9FF",
          200: "#99D3FF",
          300: "#66BEFF",
          400: "#33A8FF",
          500: "#0F80E7",
          600: "#0C6DC0",
          700: "#095A99",
          800: "#064772",
          900: "#03344B",
        },
      },
    },
    components: {
      Button: {
        variants: {
          navbar: {
            color: "whiteAlpha.900",
            _hover: {
              bg: "whiteAlpha.200",
            },
            _active: {
              bg: "whiteAlpha.300",
            },
          },
        },
      },
    },
  },
  withProse({
    baseStyle: {
      img: {
        maxH: "md",
        marginLeft: "auto",
        marginRight: "auto",
      },
      a: {
        color: "primary.600",
      },
    },
  }),
);

export default theme;
