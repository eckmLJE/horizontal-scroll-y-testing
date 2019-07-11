import React from "react";
import { Waypoint } from "react-waypoint";

import { WaypointTopContainer, WaypointBottomContainer } from "./styled";

const handleTopWPEnter = (dispatch, wpObj) => {
  const inView = true;
  dispatch({ type: "SET_TOP_IN_VIEW", inView });
  if (wpObj.previousPosition === "below")
    dispatch({ type: "RESET_TRANSLATE_START" });
};
const handleTopWPLeave = dispatch => {
  const inView = false;
  dispatch({ type: "SET_TOP_IN_VIEW", inView });
};
const handleBottomWPEnter = (dispatch, wpObj) => {
  const inView = true;
  dispatch({ type: "SET_BOTTOM_IN_VIEW", inView });
  console.log(wpObj.previousPosition);
  if (wpObj.previousPosition === "above")
    dispatch({ type: "RESET_TRANSLATE_END" });
};
const handleBottomWPLeave = dispatch => {
  const inView = false;
  dispatch({ type: "SET_BOTTOM_IN_VIEW", inView });
};

export const WaypointTop = ({ dispatch }) => (
  <WaypointTopContainer>
    <Waypoint
      onEnter={wpObj => {
        handleTopWPEnter(dispatch, wpObj);
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
      onEnter={wpObj => {
        handleBottomWPEnter(dispatch, wpObj);
      }}
      onLeave={() => {
        handleBottomWPLeave(dispatch);
      }}
    />
  </WaypointBottomContainer>
);
