import React from 'react'
import './index.scss'

type Props = {
  isSubmitting: boolean
}

export const AuthentificateFormSubmitButton: React.FC<Props> = ({
  isSubmitting,
}) => {
  return (
    <button type="submit" disabled={isSubmitting} className="loginSubmitButton">
      Submit
    </button>
  )
}
