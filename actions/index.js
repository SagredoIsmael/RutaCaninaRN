export const insert_dataRoutes = dataRoutes => {
  return {
    type: "insert_dataRoutes",
    payload: dataRoutes
  };
};

export const insert_dataUser = dataUser => {
  return {
    type: "insert_dataUser",
    payload: dataUser
  };
};

export const insert_dataMyUser = dataMyUser => {
  return {
    type: "insert_dataMyUser",
    payload: dataMyUser
  };
};

export const reset_newRoute = dataNewRoute => {
  return {
    type: "reset_newRoute",
    payload: dataNewRoute
  };
};

export const insert_dataNewRoute = dataNewRoute => {
  return {
    type: "insert_dataNewRoute",
    payload: dataNewRoute
  };
};

export const insert_scrollPositionList = scrollPositionList => {
  return {
    type: "insert_scrollPositionList",
    payload: scrollPositionList
  };
};
