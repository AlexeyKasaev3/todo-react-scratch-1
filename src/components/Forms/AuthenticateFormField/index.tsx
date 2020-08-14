import React from 'react'

import './index.scss'

type Props = {
  type: string
  name: string
  onChange: (e: React.ChangeEvent) => void
  onBlur: (e: React.FocusEvent) => void
  value: string
  placeholder: string
}

export const AuthenticateFormField: React.FC<Props> = ({
  type,
  name,
  onBlur,
  onChange,
  value,
  placeholder,
}) => {
  return (
    <input
      className="loginInput"
      type={type}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      placeholder={placeholder}
    />
  )
}
