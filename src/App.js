import React from "react";
import styled from "styled-components";
import GlobalStyle from "./global-style";

import HorizontalScroll from "./horizontal-scroll";

const Main = styled.main``;

const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  border: 1px solid green;
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
