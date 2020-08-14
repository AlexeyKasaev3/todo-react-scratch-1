import React from 'react'
import { Formik } from 'formik'
import './LoginPage.scss'
import { AuthenticateFormField } from '../Forms/AuthenticateFormField'
import { AuthentificateFormSubmitButton } from '../Buttons/AuthentificateFormSubmitButton'

export const LoginPage: React.FC = () => {
  return (
    <>
      <p className="text-center mb-30">Welcome back!</p>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors: any = {}
          if (!values.email) {
            errors.email = 'Please enter your email'
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address'
          }

          if (!values.password) {
            errors.password = 'Please enter your password'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values, null, 2))
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
          <form onSubmit={handleSubmit} className="loginForm" noValidate>
            <AuthenticateFormField
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Your email"
            />

            {errors.email && touched.email && (
              <div className="inputValidationError">{errors.email}</div>
            )}
            <AuthenticateFormField
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Password"
            />
            {errors.password && touched.password && (
              <div className="inputValidationError">{errors.password}</div>
            )}
            <AuthentificateFormSubmitButton isSubmitting={isSubmitting} />
          </form>
        )}
      </Formik>
    </>
  )
}
