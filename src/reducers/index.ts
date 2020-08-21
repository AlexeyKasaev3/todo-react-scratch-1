import { combineReducers } from '@reduxjs/toolkit'

import { todosById } from './todosById'
import { internetOrServerProblems } from './internetOrServerProblems'
import { authorisationStatusReducer } from './authorisationStatus'
import { loginPageReducer } from '../components/LoginPage/reducer'
import { registerPageReducer } from '../components/RegisterPage/reducer'

const todoApp = combineReducers({
  todosById,
  internetOrServerProblems,
  authorisationStatus: authorisationStatusReducer,
  isLoginPageError: loginPageReducer,
  isRegisterPageError: registerPageReducer,
})

export default todoApp
