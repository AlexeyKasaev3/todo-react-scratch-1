import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllCompletedTodosAction } from '../../actions'
import './TodoListFooter.scss'
import { NavLink } from 'react-router-dom'
import { IStore } from '../../configureStore'

export function TodoListFooter() {
  const state = useSelector<IStore, IStore>((state) => state)
  const dispatch = useDispatch()

  const [uncompletedItemsNum, setUncompletedItemsNum] = useState<number | null>(
    null
  )
  const [isClearButtonShown, setIsClearButtonShown] = useState<boolean>(false)

  useEffect(() => {
    setUncompletedItemsNum(
      Object.keys(state.todosById).filter(
        (key) => !state.todosById[key].isComplete
      ).length
    )
    if (
      Object.keys(state.todosById).filter(
        (key) => state.todosById[key].isComplete
      ).length
    ) {
      setIsClearButtonShown(true)
    } else {
      setIsClearButtonShown(false)
    }
  }, [state])

  function onClearButtonClick() {
    dispatch(deleteAllCompletedTodosAction())
  }

  return (
    <div className="root">
      <div className="itemsLeft">
        {uncompletedItemsNum} item{uncompletedItemsNum === 1 ? '' : 's'} left
      </div>
      <ul className="menu">
        <li>
          <NavLink to="/all" activeClassName="active" exact>
            All
          </NavLink>
        </li>
        <li>
          <NavLink to="/active" activeClassName="active">
            Active
          </NavLink>
        </li>
        <li>
          <NavLink to="/completed" activeClassName="active">
            Completed
          </NavLink>
        </li>
      </ul>
      {isClearButtonShown ? (
        <button className="clearButton" onClick={onClearButtonClick}>
          Clear completed
        </button>
      ) : null}
    </div>
  )
}
