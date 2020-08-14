import { fork, takeLatest, call, put } from 'redux-saga/effects'
import {
  addNewTodoAction,
  deleteTodoAction,
  initialFetchAllTodosAction,
  populateStoreWithFetchedTodosAction,
} from '../actions'
import { addNewTodo, fetchAllTodos, IFetchedTodo } from '../api'
import { ITodo } from 'reducers/todosById'

export function* rootSaga() {
  yield fork(watchInitialFetchAllTodos)
  yield fork(watchAddNewTodo as any)
}

function* watchInitialFetchAllTodos() {
  yield takeLatest(
    initialFetchAllTodosAction.toString(),
    initialFetchAllTodosSaga
  )
}

function* initialFetchAllTodosSaga() {
  try {
    const todos: IFetchedTodo[] = yield call(fetchAllTodos)
    yield put(populateStoreWithFetchedTodosAction(todos))
  } catch (error) {
    console.error(error.message)
  }
}

function* watchAddNewTodo(action: any) {
  yield takeLatest(addNewTodoAction.toString(), addnewTodo)
}

function* addnewTodo(action: any) {
  const newTodo: ITodo = action.payload
  const newTodoToServer: IFetchedTodo = {
    _id: newTodo.id,
    text: newTodo.text,
    isComplete: newTodo.isComplete,
  }
  try {
    yield call(addNewTodo, newTodoToServer)
  } catch (error) {
    yield put(deleteTodoAction(newTodo.id))
  }
}
