import React, { useRef, useState } from 'react'

import { useDispatch } from 'react-redux'
import { addNewTodoAction } from '../../../actions/'
import './AddTodoInput.scss'

export function AddTodoInput() {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState<string>('')

  const inputRef = useRef<HTMLInputElement>(null)

  function onChangeHandler() {
    const inputElement = inputRef.current!
    setInputValue(inputElement.value)
  }

  function onKeyUpHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      const inputElement = inputRef.current!
      if (inputElement.value) {
        dispatch(addNewTodoAction(inputElement.value))
        setInputValue('')
      }
    }
  }

  return (
    <input
      ref={inputRef}
      className="addTodoInput"
      type="text"
      placeholder="What needs to be done?"
      value={inputValue}
      onChange={onChangeHandler}
      onKeyUp={onKeyUpHandler}
      autoFocus
    />
  )
}
