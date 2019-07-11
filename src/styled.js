import styled from "styled-components";

export const DynamicHeightContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${({ dynamicHeight }) => dynamicHeight}px;
`;

export const HorizontalObjectContainer = styled.div`
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

export const HorizontalObject = styled.div.attrs(({ translate }) => ({
  style: { transform: `translateX(${translate}px)` }
}))`
  height: 50%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0 150px;
`;

export const WaypointTopContainer = styled.div`
  position: absolute;
  top: 10px;
`;
export const WaypointBottomContainer = styled.div`
  position: absolute;
  bottom: 10px;
`;
