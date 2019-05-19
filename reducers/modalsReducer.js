import { OPEN_NAMEUSER_MODAL, CLOSE_NAMEUSER_MODAL } from '../actions/types'

const nameUserModal = {
  isOpen: false,
}

const initialState = {nameUserModal}


export default (state = initialState, action) => {
  switch(action.type){

    case OPEN_NAMEUSER_MODAL:
      const newState1 = { ...state }
      newState1.nameUserModal.isOpen = true
      return newState1

    case CLOSE_NAMEUSER_MODAL:
      const newState2 = { ...state }
      newState2.nameUserModal.isOpen = false
        return newState2

    default:
      return state
  }
}
