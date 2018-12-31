export const insert_dataRoutes = (dataRoutes) => {
  return {
    type: 'insert_dataRoutes',
    payload: dataRoutes
  }
}

export const insert_user = (keyUser) => {
  return {
    type: 'insert_user',
    payload: keyUser
  }
}

export const insert_dataUser = (dataUser) => {
  return {
    type: 'insert_dataUser',
    payload: dataUser
  }
}

export const insert_dataMyUser = (dataMyUser) => {
  return {
    type: 'insert_dataMyUser',
    payload: dataMyUser
  }
}

export const insert_dataNewRoute = (dataNewRoute) => {
  return {
    type: 'insert_dataNewRoute',
    payload: dataNewRoute
  }
}
