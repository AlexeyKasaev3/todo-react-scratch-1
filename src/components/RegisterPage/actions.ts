import { createAction } from '@reduxjs/toolkit'

export const userAlreadyExistsErrorAction = createAction<boolean>(
  'userAlreadyExistsErrorAction'
)
