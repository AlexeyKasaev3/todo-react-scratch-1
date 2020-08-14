import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setAllTodosAsCompletedAction,
  setAllTodosAsNotCompletedAction,
} from '../../actions'

import cn from 'classnames'
import './ArrowToggleTodos.scss'
import { IStore } from '../../configureStore'
import { ITodosById } from '../../reducers/todosById'

export function ArrowToggleTodos() {
  const dispatch = useDispatch()
  const [arrowSelectorVisibility, setArrowSelectorVisibility] = useState<
    string
  >('invisible')
  const todos = useSelector<IStore, ITodosById>((state) => state.todosById)
  const hasTodos = !!Object.keys(todos).length
  const hasUncompletedTodos = !!Object.keys(todos).filter(
    (key) => !todos[key].isComplete
  ).length

  useEffect(() => {
    handleArrowVisibility()

    function handleArrowVisibility() {
      if (hasTodos && !hasUncompletedTodos) {
        setArrowSelectorVisibility('visible')
      } else if (hasTodos) {
        setArrowSelectorVisibility('halfVisible')
      } else {
        setArrowSelectorVisibility('invisible')
      }
    }
  }, [todos, hasTodos, hasUncompletedTodos])

  function onClickHandler() {
    if (hasTodos && hasUncompletedTodos) {
      dispatch(setAllTodosAsCompletedAction())
    } else if (hasTodos) {
      dispatch(setAllTodosAsNotCompletedAction())
    }
  }

  return (
    <button
      className={cn('arrowSelector', arrowSelectorVisibility)}
      onClick={onClickHandler}
    />
  )
}
