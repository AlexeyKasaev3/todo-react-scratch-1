import { internetOrServerProblemsAction } from '../actions'
import { IAction } from './todosById'

export function internetOrServerProblems(state = false, action: IAction) {
  switch (action.type) {
    case internetOrServerProblemsAction.toString(): {
      return action.payload
    }
    default: {
      return state
    }
  }
}
