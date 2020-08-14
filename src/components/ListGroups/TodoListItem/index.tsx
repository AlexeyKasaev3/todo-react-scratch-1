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
  _id: string
  text: string
  isComplete: boolean
}

export const TodoListItem: React.FC<Props> = ({ _id, text, isComplete }) => {
  const dispatch = useDispatch()
  const [isInEditMode, setIsInEditMode] = useState(false)
  const [todoText, setTodoText] = useState(text)

  function onCompleteStatusChangeHandler() {
    dispatch(toggleTodoCompleteStatusAction(_id))
  }

  function onDeleteHandler() {
    dispatch(deleteTodoAction(_id))
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
      dispatch(editTodoTextAction({ _id, todoText }))
    } else {
      dispatch(deleteTodoAction(_id))
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
