import React from 'react'
import { useDispatch } from 'react-redux'
import { internetOrServerProblemsAction } from '../../../actions'

import './style.scss'

export const InternetOrServerProblemPopover: React.FC = () => {
  const dispatch = useDispatch()
  function handleCloseButtonClick() {
    dispatch(internetOrServerProblemsAction(false))
  }

  return (
    <div className="internetOrServerProblemPopover animate__animated animate__backInLeft">
      <div className="closePopoverButton" onClick={handleCloseButtonClick} />
      <div className="warningSign" />
      <p className="warningText">
        The are some problems with connection. Your progress aren't saving
      </p>
    </div>
  )
}
