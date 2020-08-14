import React from 'react'

import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { todosByFilterSelector } from '../../../actions'
import { TodoListItem } from '../TodoListItem'

import { IStore } from '../../../configureStore'
import { TFilterValues } from '../../../actions'

export function TodoList() {
  const state = useSelector<IStore, IStore>((state) => state)
  const todoFilterValue: TFilterValues = (useLocation() as any).pathname
  const filteredTodos = todosByFilterSelector(state, todoFilterValue)

  return filteredTodos ? (
    <>
      {Object.values(filteredTodos).map((todo) => {
        return <TodoListItem {...todo} key={todo._id} />
      })}
    </>
  ) : null
}
