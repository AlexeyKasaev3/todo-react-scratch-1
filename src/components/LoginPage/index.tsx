import React from 'react'
import { Formik } from 'formik'
import './LoginPage.scss'
import { AuthenticateFormField } from '../Forms/AuthenticateFormField'
import { AuthentificateFormSubmitButton } from '../Buttons/AuthentificateFormSubmitButton'
import { loginFormSubmitAction } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { IStore } from '../../configureStore'
import { AuthorisationStatus } from '../../reducers/authorisationStatus'
import { wrongLoginOrPasswordAction } from './actions'

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch()
  const userAuthStatus = useSelector<IStore, AuthorisationStatus>(
    (state) => state.authorisationStatus
  )
  const isWrongLoginOrPass = useSelector<IStore, boolean>(
    (state) => state.isLoginPageError
  )

  function resetFormError() {
    if (isWrongLoginOrPass) {
      dispatch(wrongLoginOrPasswordAction(false))
    }
  }
  return (
    <>
      <p className="text-center mb-30">Welcome back!</p>
      <Formik
        initialValues={{ userEmail: '', userPassword: '' }}
        validate={(values) => {
          const errors: any = {}
          if (!values.userEmail) {
            errors.userEmail = 'Please enter your email'
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.userEmail)
          ) {
            errors.userEmail = 'Invalid email address'
          }

          if (!values.userPassword) {
            errors.userPassword = 'Please enter your password'
          }
          return errors
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const { userEmail, userPassword } = values
          await dispatch(loginFormSubmitAction({ userEmail, userPassword }))
          setSubmitting(false)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="loginForm"
            noValidate
            onKeyDown={resetFormError}
          >
            <AuthenticateFormField
              type="email"
              name="userEmail"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userEmail}
              placeholder="Your email"
            />

            {errors.userEmail && touched.userEmail && (
              <div className="inputValidationError">{errors.userEmail}</div>
            )}
            <AuthenticateFormField
              type="password"
              name="userPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userPassword}
              placeholder="Password"
            />
            {errors.userPassword && touched.userPassword && (
              <div className="inputValidationError">{errors.userPassword}</div>
            )}
            {isWrongLoginOrPass ? (
              <div className="formError">Wrong login or password</div>
            ) : null}
            <AuthentificateFormSubmitButton isSubmitting={isSubmitting} />
          </form>
        )}
      </Formik>
      {userAuthStatus === 'loggedIn' ? <Redirect to="/all" /> : null}
    </>
  )
}
