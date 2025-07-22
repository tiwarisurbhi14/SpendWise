import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useWindowSize } from "../../utils/useWindowSize";

const moveOrb = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: var(--orb-transform);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const OrbStyled = styled.div`
  width: 70vh;
  height: 50vh;
  position: absolute;
  border-radius: 50%;
  margin-left: -37vh;
  margin-top: -37vh;
  background: linear-gradient(180deg, #f56692 0%, #f2994a 100%);
  filter: blur(400px);
  animation: ${moveOrb} 15s alternate linear infinite;
`;

function Orb() {
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (width && height) {
      const newTransform = `translate(${width / 1.2}px, ${height / 2}px)`;
      document.documentElement.style.setProperty("--orb-transform", newTransform);
    }
  }, [width, height]);

  return <OrbStyled />;
}

export default Orb;
