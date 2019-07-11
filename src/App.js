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

const setDynamicHeight = (ref, dispatch) => {
  const objectWidth = ref.current.scrollWidth;
  dispatch({ type: "SET_OBJECT_WIDTH", objectWidth });
  const dynamicHeight = calcDynamicHeight(objectWidth);
  dispatch({ type: "SET_DYNAMIC_HEIGHT", dynamicHeight });
};

const applyScrollListener = (dispatch, containerRef) => {
  window.addEventListener("scroll", () => {
    const offsetTop = containerRef.current.offsetTop;
    dispatch({ type: "SET_DELTA_X_OFFSET_TOP", offsetTop });
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

  const containerRef = useRef(null);
  const objectRef = useRef(null);

  useEffect(() => {
    setDynamicHeight(objectRef, dispatch);
    applyScrollListener(dispatch, containerRef);
    window.addEventListener("resize", () => {
      setDynamicHeight(objectRef, dispatch);
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Section />
        <Section>
          <DynamicHeightContainer dynamicHeight={translate.dynamicHeight}>
            <HorizontalObjectContainer ref={containerRef}>
              <WaypointTop dispatch={dispatch} />
              <WaypointBottom dispatch={dispatch} />
              <HorizontalObject translate={translate.deltaX} ref={objectRef}>
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
