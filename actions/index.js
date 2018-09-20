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
