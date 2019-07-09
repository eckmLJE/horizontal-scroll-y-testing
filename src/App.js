import React, { useReducer, useEffect } from "react";
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
  height: ${({ height }) => height}px;
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

const WaypointTopContainer = styled.div`
  position: absolute;
  top: 0;
`;
const WaypointBottomContainer = styled.div`
  position: absolute;
  bottom: 0;
`;

const translateReducer = (state, action) => {
  switch (action.type) {
    case "SET_DELTA_X_SCROLL_Y":
      const deltaX = state.scrollY - action.scrollY;
      console.log(deltaX);
      return { ...state };
    case "SET_TOP_IN_VIEW":
      return { ...state, topInView: action.inView };
    case "SET_BOTTOM_IN_VIEW":
      return { ...state, bottomInView: action.inView };
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
    dynamicHeight: 2000
  });

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      dispatch({ type: "SET_DELTA_X_SCROLL_Y", scrollY });
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Section />
        <Section>
          <DynamicHeightContainer height={translate.dynamicHeight}>
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
            </HorizontalObjectContainer>
          </DynamicHeightContainer>
        </Section>
        <Section />
      </Container>
    </>
  );
};
