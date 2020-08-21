import { PayloadAction } from '@reduxjs/toolkit'
import { userAlreadyExistsErrorAction } from './actions'

export function registerPageReducer(
  state = false,
  action: PayloadAction<boolean>
) {
  switch (action.type) {
    case userAlreadyExistsErrorAction.toString():
      return action.payload
    default:
      return state
  }
}
