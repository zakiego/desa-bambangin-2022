import styled from "@emotion/styled";

import theme from "~/src/styles/theme";

const borderRadius = "100%";
const spacing = "20px";
const circleSize = "15px";
const color = theme.colors.primary[500];
const backgroundColor = theme.colors.primary[100];

export const LoadingStyle = styled.div`
  .dot-flashing {
    position: relative;
    width: ${circleSize};
    height: ${circleSize};
    border-radius: ${borderRadius};
    background-color: ${color};
    color: ${color};
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: 0.5s;
  }

  .dot-flashing::before,
  .dot-flashing::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }

  .dot-flashing::before {
    left: -${spacing};
    width: ${circleSize};
    height: ${circleSize};
    border-radius: ${borderRadius};
    background-color: ${color};
    color: ${color};
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
  }

  .dot-flashing::after {
    left: ${spacing};
    width: ${circleSize};
    height: ${circleSize};
    border-radius: ${borderRadius};
    background-color: ${color};
    color: ${color};
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dotFlashing {
    0% {
      background-color: ${color};
    }
    50%,
    100% {
      background-color: ${backgroundColor};
    }
  }
`;
