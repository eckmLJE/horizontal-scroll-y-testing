import React, { useReducer, useEffect, useRef } from "react";
import GlobalStyle from "./global-style";

import translateReducer from "./reducer";
import { WaypointTop, WaypointBottom } from "./waypoints";

import {
  Container,
  Section,
  DynamicHeightContainer,
  HorizontalObjectContainer,
  HorizontalObject,
  HorizontalCard
} from "./styled";

const calcDynamicHeight = objectWidth => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return objectWidth - vw + vh + 150;
};

const handleDynamicHeight = (ref, dispatch) => {
  const objectWidth = ref.current.scrollWidth;
  dispatch({ type: "SET_OBJECT_WIDTH", objectWidth });
  const dynamicHeight = calcDynamicHeight(objectWidth);
  dispatch({ type: "SET_DYNAMIC_HEIGHT", dynamicHeight });
};

const applyScrollListener = dispatch => {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    dispatch({ type: "SET_DELTA_X_SCROLL_Y", scrollY });
  });
};

const SampleCards = React.memo(() =>
  Array(5)
    .fill(0)
    .map((_e, i) => <HorizontalCard key={`sampleCard-${i}`} />)
);

export default () => {
  const [translate, dispatch] = useReducer(translateReducer, {
    topInView: false,
    bottomInView: false,
    scrollY: 0,
    deltaX: 0,
    dynamicHeight: null,
    objectWidth: null
  });

  const horizontalRef = useRef(null);

  useEffect(() => {
    handleDynamicHeight(horizontalRef, dispatch);
    applyScrollListener(dispatch);
    window.addEventListener("resize", () => {
      handleDynamicHeight(horizontalRef, dispatch);
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Section />
        <Section>
          <DynamicHeightContainer dynamicHeight={translate.dynamicHeight}>
            <HorizontalObjectContainer>
              <WaypointTop dispatch={dispatch} />
              <WaypointBottom dispatch={dispatch} />
              <HorizontalObject
                translate={translate.deltaX}
                ref={horizontalRef}
              >
                <SampleCards />
              </HorizontalObject>
            </HorizontalObjectContainer>
          </DynamicHeightContainer>
        </Section>
        <Section />
      </Container>
    </>
  );
};
