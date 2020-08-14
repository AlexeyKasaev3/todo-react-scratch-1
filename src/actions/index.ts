import { createAction, PrepareAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { createSelector } from '@reduxjs/toolkit'

import { ITodosById, IAddTodoPayload, ITodo } from '../reducers/todosById'
import { IStore } from '../configureStore'
import { IFetchedTodo } from '../api'

const preparePayloadForAddNewTodoAction = (
  todoText: string
): IAddTodoPayload => {
  return {
    payload: {
      text: todoText,
      id: uuidv4(),
      isComplete: false,
    },
  }
}

export const addNewTodoAction = createAction<PrepareAction<ITodo>>(
  'add new todo',
  preparePayloadForAddNewTodoAction
)

export const toggleTodoCompleteStatusAction = createAction<string>(
  'toggle todo'
)

export const deleteTodoAction = createAction<string>('delete todo')

export const editTodoTextAction = createAction<{
  _id: string
  todoText: string
}>('edit todo action')

export const setAllTodosAsCompletedAction = createAction(
  'set all todos as completed'
)

export const setAllTodosAsNotCompletedAction = createAction(
  'set all todos as not completed'
)

export const setDisplayedTodosFilterAction = createAction(
  'set displayed todos filter'
)

export const deleteAllCompletedTodosAction = createAction(
  'delete all completed todos'
)

export const initialFetchAllTodosAction = createAction('fetch all todos')

export const populateStoreWithFetchedTodosAction = createAction<IFetchedTodo[]>(
  'populate store with fetched todos action'
)

const getTodosInputSelector = (store: IStore): ITodosById => store.todosById
const getTodoFilterInputSelector = (
  store: IStore,
  filter: TFilterValues
): TFilterValues => filter

export const hasTodosSelector = createSelector(
  [getTodosInputSelector],
  (todos) => !!Object.keys(todos).length
)

export const todosByFilterSelector: (
  store: IStore,
  filter: TFilterValues
) => ITodosById = createSelector(
  [getTodosInputSelector, getTodoFilterInputSelector],
  (todos, filter) => {
    switch (filter) {
      case '/all':
        return todos
      case '/active': {
        const activeTodos: ITodosById = {}
        Object.keys(todos).forEach(
          (key) => !todos[key].isComplete && (activeTodos[key] = todos[key])
        )
        return activeTodos
      }
      case '/completed': {
        const completedTodos: ITodosById = {}
        Object.keys(todos).forEach(
          (key) => todos[key].isComplete && (completedTodos[key] = todos[key])
        )
        return completedTodos
      }
    }
  }
)

export type TFilterValues = '/all' | '/active' | '/completed'
