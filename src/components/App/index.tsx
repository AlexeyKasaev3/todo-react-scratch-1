import React, { useEffect } from 'react'
import cn from 'classnames'

import { HeaderAreaComponent } from '../Areas'
import { TodoList } from '../ListGroups/TodoList'
import { TodoListFooter } from '../TodoListFooter'

import './App.scss'
import { useDispatch, useSelector } from 'react-redux'
import { initialFetchAllTodosAction, hasTodosSelector } from '../../actions'

import { IStore } from '../../configureStore'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { LoginPage } from '../LoginPage'
import { RegisterPage } from '../RegisterPage'

export function App() {
  const dispatch = useDispatch()
  const hasTodos = useSelector<IStore, boolean>(hasTodosSelector)
  const appContainerClasses = cn('appContainer', 'mx-auto', 'pt-30')
  const headerClasses =
    'text-center mb-30 mt-0 font-weight-light fColorHeader fSize100'

  useEffect(() => {
    dispatch(initialFetchAllTodosAction())
  }, [])

  return (
    <div className={appContainerClasses}>
      <BrowserRouter>
        <h1 className={headerClasses}>
          <Link to="/">todos</Link>
        </h1>
        <Route path="/" exact>
          <div>
            <p className="text-center mb-30">Welcome!</p>
            <div className="authenticateButtonsWrapper">
              <Link to="login" className="linkButton mx-10">
                Login
              </Link>
              <Link to="register" className="linkButton mx-10">
                Register
              </Link>
            </div>
          </div>
        </Route>
        <Route path={['/all', '/active', '/completed']}>
          <div className="appControlWrapper">
            <HeaderAreaComponent />
            <TodoList />
            {hasTodos ? <TodoListFooter /> : null}
          </div>
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
      </BrowserRouter>
    </div>
  )
}
