import { PayloadAction } from '@reduxjs/toolkit'
import { wrongLoginOrPasswordAction } from './actions'

export function loginPageReducer(
  state = false,
  action: PayloadAction<boolean>
) {
  switch (action.type) {
    case wrongLoginOrPasswordAction.toString():
      return action.payload
    default:
      return state
  }
}
