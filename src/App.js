import React, { useReducer, useEffect, useRef } from "react";
import styled from "styled-components";
import GlobalStyle from "./global-style";
import { Waypoint } from "react-waypoint";

const Container = styled.main``;

const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  border: 1px solid green;
`;

const DynamicHeightContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${({ dynamicHeight }) => dynamicHeight}px;
`;

const HorizontalObjectContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  background-color: lightcyan;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
`;

const HorizontalObject = styled.div.attrs(({ translate }) => ({
  style: { transform: `translateX(${translate}px)` }
}))`
  height: 50%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0 150px;
  /* width: max-content; */
`;

const HorizontalCard = styled.div`
  position: relative;
  height: 300px;
  width: 500px;
  background-color: navy;
  margin-right: 75px;
  flex-shrink: 0;
`;

const WaypointTopContainer = styled.div`
  position: absolute;
  top: 10px;
`;
const WaypointBottomContainer = styled.div`
  position: absolute;
  bottom: 10px;
`;

const translateReducer = (state, action) => {
  switch (action.type) {
    case "SET_DELTA_X_SCROLL_Y":
      const deltaY = state.scrollY - action.scrollY;
      const deltaX = state.deltaX + deltaY;
      const inView = state.bottomInView && state.topInView;
      // console.log({
      //   deltaY,
      //   deltaX,
      //   inView
      // });
      if (inView && deltaY < 0) {
        return deltaX < 0
          ? { ...state, deltaX, scrollY: action.scrollY }
          : { ...state, deltaX: 0, scrollY: action.scrollY };
      } else if (inView && deltaY > 0) {
        return deltaX > -state.dynamicHeight
          ? { ...state, deltaX, scrollY: action.scrollY }
          : { ...state, deltaX: -state.dynamicHeight, scrollY: action.scrollY };
      } else {
        // console.log("deltaY is 0, returning state");
        return { ...state, scrollY: action.scrollY };
      }
    case "SET_TOP_IN_VIEW":
      return { ...state, topInView: action.inView };
    case "SET_BOTTOM_IN_VIEW":
      return { ...state, bottomInView: action.inView };
    case "SET_OBJECT_WIDTH":
      return { ...state, objectWidth: action.objectWidth };
    case "SET_DYNAMIC_HEIGHT":
      return { ...state, dynamicHeight: action.dynamicHeight };
    default:
      return { ...state };
  }
};

export default () => {
  const [translate, dispatch] = useReducer(translateReducer, {
    topInView: false,
    bottomInView: false,
    scrollY: 0,
    deltaX: 0,
    dynamicHeight: 2000,
    // viewport: { vw: null, vh: null },
    objectWidth: null
  });

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      dispatch({ type: "SET_DELTA_X_SCROLL_Y", scrollY });
    });
    const objectWidth = horizontalRef.current.scrollWidth;
    dispatch({ type: "SET_OBJECT_WIDTH", objectWidth });
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dynamicHeight = objectWidth - vw + vh + 200;
    console.log({
      objectWidth,
      vw,
      vh,
      dynamicHeight
    });
    dispatch({ type: "SET_DYNAMIC_HEIGHT", dynamicHeight });
  }, []);

  const horizontalRef = useRef(null);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Section />
        <Section>
          <DynamicHeightContainer dynamicHeight={translate.dynamicHeight}>
            <HorizontalObjectContainer>
              <WaypointTopContainer>
                <Waypoint
                  onEnter={() => {
                    console.log("Top Entering");
                    const inView = true;
                    dispatch({ type: "SET_TOP_IN_VIEW", inView });
                  }}
                  onLeave={() => {
                    console.log("Top Leaving");
                    const inView = false;
                    dispatch({ type: "SET_TOP_IN_VIEW", inView });
                  }}
                />
              </WaypointTopContainer>
              <WaypointBottomContainer>
                <Waypoint
                  onEnter={() => {
                    console.log("Bottom Entering");
                    const inView = true;
                    dispatch({ type: "SET_BOTTOM_IN_VIEW", inView });
                  }}
                  onLeave={() => {
                    console.log("Bottom Leaving");
                    const inView = false;
                    dispatch({ type: "SET_BOTTOM_IN_VIEW", inView });
                  }}
                />
              </WaypointBottomContainer>
              <HorizontalObject
                translate={translate.deltaX}
                ref={horizontalRef}
              >
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
              </HorizontalObject>
            </HorizontalObjectContainer>
          </DynamicHeightContainer>
        </Section>
        <Section />
      </Container>
    </>
  );
};
