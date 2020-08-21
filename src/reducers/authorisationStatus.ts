import { PayloadAction } from '@reduxjs/toolkit'
import { setAuthorisationStatusAction } from '../actions'

export type AuthorisationStatus = 'loggedIn' | 'loggedOut' | 'pending'

export function authorisationStatusReducer(
  state: AuthorisationStatus = 'pending',
  action: PayloadAction<AuthorisationStatus>
) {
  switch (action.type) {
    case setAuthorisationStatusAction.toString():
      return action.payload
    default:
      return state
  }
}
