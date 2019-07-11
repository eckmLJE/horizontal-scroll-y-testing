import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import HorizontalScroll from "./horizontal-scroll";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
  }
`;

const Main = styled.main``;

const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

export const SampleCard = styled.div`
  position: relative;
  height: 300px;
  width: 500px;
  background-color: navy;
  margin-right: 75px;
  flex-shrink: 0;
`;

const SampleCards = React.memo(() =>
  Array(5)
    .fill(0)
    .map((_e, i) => <SampleCard key={`sampleCard-${i}`} />)
);

export default () => (
  <>
    <GlobalStyle />
    <Main>
      <Section />
      <Section>
        <HorizontalScroll>
          <SampleCards />
        </HorizontalScroll>
      </Section>
      <Section />
    </Main>
  </>
);
