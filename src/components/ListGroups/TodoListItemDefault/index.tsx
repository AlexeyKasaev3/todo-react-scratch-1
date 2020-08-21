import React from 'react'
import cn from 'classnames'

import './TodoListItemDefault.scss'

type Props = {
  text: string
  isComplete: boolean
  onDeleteHandler: () => void
  onCompleteStatusChangeHandler: () => void
  onDoubleClickHandler: () => void
}

export const TodoListItemDefaultComponent: React.FC<Props> = ({
  text,
  isComplete,
  onDeleteHandler,
  onCompleteStatusChangeHandler,
  onDoubleClickHandler,
}) => {
  function isDoubleClickOnDiv(event: React.MouseEvent<HTMLDivElement>) {
    return (event.target as HTMLInputElement).tagName === 'DIV'
  }

  return (
    <div
      className={cn('todoItem', {
        completed: isComplete,
      })}
      onDoubleClick={(event) => {
        isDoubleClickOnDiv(event) && onDoubleClickHandler()
      }}
    >
      {text}
      <button
        className="toggleTodoButton"
        onClick={onCompleteStatusChangeHandler}
      />
      <button className="deleteButon" onClick={onDeleteHandler} />
    </div>
  )
}
