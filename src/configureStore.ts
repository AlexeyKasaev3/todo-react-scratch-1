import { createStore, applyMiddleware } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas'
import todoApp from './reducers/'
import { ITodosById } from './reducers/todosById'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  todoApp,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export interface IStore {
  todosById: ITodosById
}
