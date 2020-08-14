import React, { useState } from 'react'

import {
  toggleTodoCompleteStatusAction,
  deleteTodoAction,
  editTodoTextAction,
} from '../../../actions'

import { TodoListItemDefaultComponent } from '../TodoListItemDefault'
import { TodoListItemEditModeComponent } from '../../Forms/TodoListItemEditMode'
import { useDispatch } from 'react-redux'

type Props = {
  id: string
  text: string
  isComplete: boolean
}

export const TodoListItem: React.FC<Props> = ({ id, text, isComplete }) => {
  const dispatch = useDispatch()
  const [isInEditMode, setIsInEditMode] = useState(false)
  const [todoText, setTodoText] = useState(text)

  function onCompleteStatusChangeHandler() {
    dispatch(toggleTodoCompleteStatusAction(id))
  }

  function onDeleteHandler() {
    dispatch(deleteTodoAction(id))
  }

  function onDoubleClickHandler() {
    setIsInEditMode(true)
  }

  function onClickAwayHandler() {
    performTodoUpdateTextStuff()
  }

  function onInputKeyUpHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      performTodoUpdateTextStuff()
    }
  }

  function onChangeTodoTextHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setTodoText(event.currentTarget.value)
  }

  function performTodoUpdateTextStuff() {
    if (todoText.trim()) {
      setIsInEditMode(false)
      dispatch(editTodoTextAction({ id, todoText }))
    } else {
      dispatch(deleteTodoAction(id))
    }
  }

  return isInEditMode ? (
    <TodoListItemEditModeComponent
      text={todoText}
      onClickAway={onClickAwayHandler}
      onChange={onChangeTodoTextHandler}
      onKeyUp={onInputKeyUpHandler}
    />
  ) : (
    <TodoListItemDefaultComponent
      isComplete={isComplete}
      text={todoText}
      onCompleteStatusChangeHandler={onCompleteStatusChangeHandler}
      onDeleteHandler={onDeleteHandler}
      onDoubleClickHandler={onDoubleClickHandler}
    />
  )
}
