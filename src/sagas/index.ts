import { fork, takeLatest, call, put, take } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import {
  addNewTodoAction,
  initialFetchAllTodosAction,
  populateStoreWithFetchedTodosAction,
  internetOrServerProblemsAction,
  deleteTodoAction,
  registerFormSubmitAction,
  refreshAccessTokenProcessAction,
  loginFormSubmitAction,
  toggleTodoCompleteStatusAction,
  setAllTodosAsCompletedAction,
  setAllTodosAsNotCompletedAction,
  deleteAllCompletedTodosAction,
  editTodoTextAction,
  setAuthorisationStatusAction,
  determineAndSetLogginStatusAction,
} from '../actions'
import { ITodo } from 'reducers/todosById'
import {
  loginUser,
  performRefreshToken,
  performToggleTodo,
  performToggleTodos,
  registerNewUser,
  deleteCompletedTodos,
  Tokens,
  fetchAllTodos,
  addNewTodo,
  editTodo,
} from '../api'
import { deleteTodo } from '../api'
import { PayloadAction } from '@reduxjs/toolkit'
import { wrongLoginOrPasswordAction } from '../components/LoginPage/actions'
import { userAlreadyExistsErrorAction } from '../components/RegisterPage/actions'

export function* rootSaga() {
  yield fork(watchInitialFetchAllTodos)
  yield fork(watchAddNewTodo)
  yield fork(watchDeleteTodo)
  yield fork(watchRegisterFormSubmit)
  yield fork(watchRefreshAccessTokenProcess)
  yield fork(watchLoginFormSubmit)
  yield fork(watchToggleTodoCompleteStatus)
  yield fork(watchSetAllTodosAsCompleted)
  yield fork(watchSetAllTodosAsNotCompleted)
  yield fork(watchDeleteAllCompletedTodos)
  yield fork(watchEditTodo)
  yield fork(watchDetermineAndSetLoginStatus)
}

function* watchEditTodo() {
  yield takeLatest(editTodoTextAction.toString(), editTodoTextSaga)
}

function* watchDetermineAndSetLoginStatus() {
  yield takeLatest(
    determineAndSetLogginStatusAction.toString(),
    determineAndSetLoginStatusSaga
  )
}

function* watchDeleteAllCompletedTodos() {
  yield takeLatest(
    deleteAllCompletedTodosAction.toString(),
    deleteAllCompletedTodosSaga
  )
}

function* watchToggleTodoCompleteStatus() {
  yield takeLatest(toggleTodoCompleteStatusAction.toString(), toggleTodoSaga)
}

function* watchSetAllTodosAsCompleted() {
  yield takeLatest(
    setAllTodosAsCompletedAction.toString(),
    setAllTodosAsCompletedSaga
  )
}

function* watchSetAllTodosAsNotCompleted() {
  yield takeLatest(
    setAllTodosAsNotCompletedAction.toString(),
    setAllTodosAsNotCompletedSaga
  )
}

function* watchLoginFormSubmit() {
  yield takeLatest(loginFormSubmitAction.toString(), loginFormSubmitSaga)
}

function* watchRefreshAccessTokenProcess() {
  yield takeLatest(
    refreshAccessTokenProcessAction.toString(),
    refreshAccessTokenProcessSaga
  )
}

function* watchRegisterFormSubmit() {
  yield takeLatest(registerFormSubmitAction.toString(), registerFormSubmitSaga)
}

function* watchInitialFetchAllTodos() {
  yield takeLatest(
    initialFetchAllTodosAction.toString(),
    initialFetchAllTodosSaga
  )
}

function* watchAddNewTodo() {
  yield takeLatest(addNewTodoAction.toString(), addNewTodoSaga)
}

function* watchDeleteTodo() {
  yield takeLatest(deleteTodoAction.toString(), deleteTodoSaga)
}

function* registerFormSubmitSaga(
  action: PayloadAction<{ userEmail: string; userPassword: string }>
) {
  const { userEmail, userPassword } = action.payload
  try {
    const tokens: Tokens = yield call(registerNewUser, userEmail, userPassword)
    if (tokens) {
      yield call(putTokensToLocalStorageSaga, tokens)
      yield put(setAuthorisationStatusAction('loggedIn'))
      yield put(refreshAccessTokenProcessAction())
    }
  } catch (error) {
    if (error.response.status === 401) {
      yield put(userAlreadyExistsErrorAction(true))
    } else {
      console.dir(error)
      yield put(internetOrServerProblemsAction(true))
    }
  }
}

function* loginFormSubmitSaga(
  action: PayloadAction<{ userEmail: string; userPassword: string }>
) {
  const { userEmail, userPassword } = action.payload
  try {
    const tokens: Tokens = yield call(loginUser, userEmail, userPassword)
    if (tokens) {
      console.log('loginFormSubmitSaga', tokens)
      yield call(putTokensToLocalStorageSaga, tokens)
      yield put(setAuthorisationStatusAction('loggedIn'))
      yield put(refreshAccessTokenProcessAction())
    }
  } catch (error) {
    if (error.response.status === 401) {
      yield put(wrongLoginOrPasswordAction(true))
    } else {
      console.dir(error)
      yield put(internetOrServerProblemsAction(true))
    }
  }
}

function* determineAndSetLoginStatusSaga() {
  const localStorageKeys = localStorage.getItem('tokensStatusData')
  if (!localStorageKeys) {
    yield put(setAuthorisationStatusAction('loggedOut'))
  } else {
    try {
      const { refreshToken } = JSON.parse(localStorageKeys)
      const newTokens = yield call(performRefreshToken, refreshToken)
      yield call(putTokensToLocalStorageSaga, newTokens)
      yield put(setAuthorisationStatusAction('loggedIn'))
      yield put(refreshAccessTokenProcessAction())
    } catch (error) {
      yield put(internetOrServerProblemsAction(true))
    }
  }
}

function* putTokensToLocalStorageSaga(tokens: Tokens) {
  try {
    localStorage.setItem('tokensStatusData', JSON.stringify(tokens))
  } catch (error) {
    console.log('some problems with localStorage', error)
  }
}

function* refreshAccessTokenProcessSaga() {
  const channel = yield call(refreshAccessTokenChannel)
  try {
    while (true) {
      yield take(channel)
      const localStorageKeys: string = localStorage.getItem('tokensStatusData')!
      const { refreshToken } = JSON.parse(localStorageKeys)
      const newTokens = yield call(performRefreshToken, refreshToken)
      localStorage.setItem('tokensStatusData', JSON.stringify(newTokens))
      yield put(setAuthorisationStatusAction('loggedIn'))
    }
  } finally {
  }
}

function refreshAccessTokenChannel() {
  return eventChannel((emitter) => {
    console.log('REFRESH CHANNEL START')
    const interval = setInterval(() => {
      const tokensStatusStringData = localStorage.getItem('tokensStatusData')
      tokensStatusStringData ? emitter(true) : emitter(END)
    }, 300000)
    return () => clearInterval(interval)
  })
}

function* deleteTodoSaga(action: any) {
  try {
    const todoIdToDelete: string = action.payload
    yield call(deleteTodo, todoIdToDelete)
  } catch (error) {
    yield put(internetOrServerProblemsAction(true))
  }
}

function* initialFetchAllTodosSaga() {
  try {
    const todos: ITodo[] = yield call(fetchAllTodos)
    yield put(populateStoreWithFetchedTodosAction(todos))
  } catch (error) {
    yield put(internetOrServerProblemsAction(true))
  }
}

function* addNewTodoSaga(action: PayloadAction<ITodo>) {
  const newTodo: ITodo = action.payload
  try {
    yield call(addNewTodo, newTodo)
  } catch {
    yield put(internetOrServerProblemsAction(true))
  }
}

function* toggleTodoSaga(action: PayloadAction<string>) {
  const todoId = action.payload
  try {
    yield call(performToggleTodo, todoId)
  } catch {
    yield put(internetOrServerProblemsAction(true))
  }
}

function* setAllTodosAsCompletedSaga() {
  try {
    yield call(performToggleTodos, true)
  } catch {
    yield put(internetOrServerProblemsAction(true))
  }
}

function* setAllTodosAsNotCompletedSaga() {
  try {
    yield call(performToggleTodos, false)
  } catch {
    yield put(internetOrServerProblemsAction(true))
  }
}

function* deleteAllCompletedTodosSaga() {
  try {
    yield call(deleteCompletedTodos)
  } catch (error) {
    yield put(internetOrServerProblemsAction(true))
  }
}

function* editTodoTextSaga(
  action: PayloadAction<{
    _id: string
    todoText: string
  }>
) {
  const { _id: todoId, todoText } = action.payload
  try {
    yield call(editTodo, todoId, todoText)
  } catch (error) {
    yield put(internetOrServerProblemsAction(true))
  }
}
