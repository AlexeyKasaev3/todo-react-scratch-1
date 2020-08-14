import { fork, takeLatest, call, put } from 'redux-saga/effects'
import {
  addNewTodoAction,
  deleteTodoAction,
  initialFetchAllTodosAction,
  populateStoreWithFetchedTodosAction,
} from '../actions'
import { addNewTodo, fetchAllTodos } from '../api'
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

function* watchAddNewTodo(action: any) {
  yield takeLatest(addNewTodoAction.toString(), addNewTodoSaga)
}

function* initialFetchAllTodosSaga() {
  try {
    const todos: ITodo[] = yield call(fetchAllTodos)
    yield put(populateStoreWithFetchedTodosAction(todos))
  } catch (error) {
    console.error(error.message)
  }
}

function* addNewTodoSaga(action: any) {
  const newTodo: ITodo = action.payload
  try {
    yield call(addNewTodo, newTodo)
  } catch (error) {
    yield put(deleteTodoAction(newTodo._id))
  }
}
