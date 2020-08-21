import React, { useEffect } from 'react'
import cn from 'classnames'

import { HeaderAreaComponent } from '../Areas'
import { TodoList } from '../ListGroups/TodoList'
import { TodoListFooter } from '../TodoListFooter'

import './App.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  initialFetchAllTodosAction,
  hasTodosSelector,
  setAuthorisationStatusAction,
  determineAndSetLogginStatusAction,
} from '../../actions'

import { IStore } from '../../configureStore'
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom'
import { LoginPage } from '../LoginPage'
import { RegisterPage } from '../RegisterPage'
import { InternetOrServerProblemPopover } from '../Popovers/InternetOrServerProblemPopover'
import { AuthorisationStatus } from '../../reducers/authorisationStatus'
import { getDecodedJwtPayloadField } from '../../helpers/getDecodedJwtPayload'

export function App() {
  const dispatch = useDispatch()
  const hasTodos = useSelector<IStore, boolean>(hasTodosSelector)
  const isInternetOrServerProblems = useSelector<IStore, boolean>(
    (state) => state.internetOrServerProblems
  )
  const authorisationStatus = useSelector<IStore, AuthorisationStatus>(
    (state) => state.authorisationStatus
  )
  const appContainerClasses = cn('appContainer', 'mx-auto', 'pt-30')
  const headerClasses =
    'text-center mb-30 mt-0 font-weight-light fColorHeader fSize100'

  useEffect(() => {
    dispatch(determineAndSetLogginStatusAction())
  }, [])

  useEffect(() => {
    if (authorisationStatus === 'loggedIn') {
      dispatch(initialFetchAllTodosAction())
    }
  }, [authorisationStatus])

  function onLogoutButtonClick() {
    localStorage.removeItem('tokensStatusData')
    dispatch(setAuthorisationStatusAction('loggedOut'))
  }

  return (
    <div className={appContainerClasses}>
      <BrowserRouter>
        {authorisationStatus === 'loggedIn' ? (
          <Redirect to="/all" />
        ) : (
          <Redirect to="/" />
        )}
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
          <>
            <div className="appControlWrapper">
              <HeaderAreaComponent />
              <TodoList />
              {hasTodos ? <TodoListFooter /> : null}
            </div>
            {authorisationStatus === 'loggedIn' ? (
              <>
                <p className="mb-30 text-center">
                  You are logged in as{' '}
                  <b>{getDecodedJwtPayloadField('userEmail')}</b>
                </p>
                <button className="logoutButton" onClick={onLogoutButtonClick}>
                  Logout
                </button>
              </>
            ) : null}
          </>
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
      </BrowserRouter>
      {isInternetOrServerProblems ? <InternetOrServerProblemPopover /> : null}
    </div>
  )
}
