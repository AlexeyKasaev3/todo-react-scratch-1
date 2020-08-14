import { combineReducers } from '@reduxjs/toolkit'

import { todosById } from './todosById'

const todoApp = combineReducers({
  todosById,
})

export default todoApp
