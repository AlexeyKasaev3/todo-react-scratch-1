import React from 'react'

import { ArrowToggleTodos } from '../ArrowToggleTodos'
import { AddTodoInput } from '../Forms/AddTodoInput'

import './HeaderArea.scss'

export function HeaderAreaComponent() {
  return (
    <div className="headerArea">
      <div className="arrowSelectorContainer">
        <ArrowToggleTodos />
      </div>
      <div className="addTodoInputContainer">
        <AddTodoInput />
      </div>
    </div>
  )
}
