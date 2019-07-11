import React from "react";
import { Waypoint } from "react-waypoint";

import { WaypointTopContainer, WaypointBottomContainer } from "./styled";

const handleTopWPEnter = dispatch => {
  const inView = true;
  dispatch({ type: "SET_TOP_IN_VIEW", inView });
};
const handleTopWPLeave = dispatch => {
  const inView = false;
  dispatch({ type: "SET_TOP_IN_VIEW", inView });
};
const handleBottomWPEnter = dispatch => {
  const inView = true;
  dispatch({ type: "SET_BOTTOM_IN_VIEW", inView });
};
const handleBottomWPLeave = dispatch => {
  const inView = false;
  dispatch({ type: "SET_BOTTOM_IN_VIEW", inView });
};

export const WaypointTop = ({ dispatch }) => (
  <WaypointTopContainer>
    <Waypoint
      onEnter={() => {
        handleTopWPEnter(dispatch);
      }}
      onLeave={() => {
        handleTopWPLeave(dispatch);
      }}
    />
  </WaypointTopContainer>
);

export const WaypointBottom = ({ dispatch }) => (
  <WaypointBottomContainer>
    <Waypoint
      onEnter={() => {
        handleBottomWPEnter(dispatch);
      }}
      onLeave={() => {
        handleBottomWPLeave(dispatch);
      }}
    />
  </WaypointBottomContainer>
);
