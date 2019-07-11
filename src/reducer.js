export default (state, action) => {
  switch (action.type) {
    // case "SET_DELTA_X_SCROLL_Y":
    //   const deltaY = state.scrollY - action.scrollY;
    //   const deltaX = state.deltaX + deltaY;
    //   const inView = state.bottomInView && state.topInView;
    //   if (inView && deltaY < 0) {
    //     return deltaX < 0
    //       ? { ...state, deltaX, scrollY: action.scrollY }
    //       : { ...state, deltaX: 0, scrollY: action.scrollY };
    //   } else if (inView && deltaY > 0) {
    //     return deltaX > -state.dynamicHeight
    //       ? { ...state, deltaX, scrollY: action.scrollY }
    //       : { ...state, deltaX: -state.dynamicHeight, scrollY: action.scrollY };
    //   } else {
    //     return { ...state, scrollY: action.scrollY };
    //   }
    case "SET_DELTA_X_OFFSET_TOP":
      const deltaX = -action.offsetTop;
      return { ...state, deltaX };
    case "SET_TOP_IN_VIEW":
      return { ...state, topInView: action.inView };
    case "SET_BOTTOM_IN_VIEW":
      return { ...state, bottomInView: action.inView };
    case "SET_OBJECT_WIDTH":
      return { ...state, objectWidth: action.objectWidth };
    case "SET_DYNAMIC_HEIGHT":
      return { ...state, dynamicHeight: action.dynamicHeight };
    case "RESET_TRANSLATE_START":
      return { ...state, deltaX: 0 };
    case "RESET_TRANSLATE_END":
      console.log("reset translate end reached: ", -state.dynamicHeight);
      return { ...state, deltaX: -state.dynamicHeight };
    default:
      return { ...state };
  }
};
