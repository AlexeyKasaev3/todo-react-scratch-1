import { createAction } from '@reduxjs/toolkit'

export const wrongLoginOrPasswordAction = createAction<boolean>(
  'wrongLoginOrPasswordAction'
)
