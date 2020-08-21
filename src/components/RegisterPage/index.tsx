import React from 'react'
import { Formik } from 'formik'
import './RegisterPage.scss'
import { AuthenticateFormField } from '../Forms/AuthenticateFormField'
import { AuthentificateFormSubmitButton } from '../Buttons/AuthentificateFormSubmitButton'
import { useDispatch, useSelector } from 'react-redux'
import { registerFormSubmitAction } from '../../actions'
import { Redirect } from 'react-router-dom'
import { IStore } from '../../configureStore'
import { AuthorisationStatus } from '../../reducers/authorisationStatus'
import { wrongLoginOrPasswordAction } from '../LoginPage/actions'

export const RegisterPage: React.FC = () => {
  const dispatch = useDispatch()

  const userAuthStatus = useSelector<IStore, AuthorisationStatus>(
    (state) => state.authorisationStatus
  )
  const isUserAlreadyExists = useSelector<IStore, boolean>(
    (state) => state.isRegisterPageError
  )

  function resetFormError() {
    if (isUserAlreadyExists) {
      dispatch(wrongLoginOrPasswordAction(false))
    }
  }

  return (
    <>
      <p className="text-center mb-30">
        Please enter your email and password to register
      </p>
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
        onSubmit={(values, { setSubmitting }) => {
          const { userEmail, userPassword } = values
          dispatch(registerFormSubmitAction({ userEmail, userPassword }))
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
          /* and other goodies */
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
            {isUserAlreadyExists ? (
              <div className="formError">
                User with this email already exists
              </div>
            ) : null}
            <AuthentificateFormSubmitButton isSubmitting={isSubmitting}>
              Submit
            </AuthentificateFormSubmitButton>
          </form>
        )}
      </Formik>
      {userAuthStatus === 'loggedIn' ? <Redirect to="/all" /> : null}
    </>
  )
}
