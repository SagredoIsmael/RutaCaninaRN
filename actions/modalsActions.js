
import { OPEN_NAMEUSER_MODAL, CLOSE_NAMEUSER_MODAL } from './types';


export const openNameUserModal = () => {
  return {
    type: OPEN_NAMEUSER_MODAL
  }
}

export const closeNameUserModal = () => {
  return {
    type: CLOSE_NAMEUSER_MODAL
  }
}
