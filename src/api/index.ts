import axios from 'axios'

const BASE_URL = 'http://localhost:3000'
const FETCH_ALL_TODOS_URL = BASE_URL + '/todos?status=all'
const ADD_NEW_TODO = BASE_URL + '/todos'

export type IFetchedTodo = {
  _id: string
  text: string
  isComplete: boolean
}

export async function fetchAllTodos() {
  return await axios.get(FETCH_ALL_TODOS_URL).then((response) => response.data)
}

export async function addNewTodo(todo: IFetchedTodo) {
  console.log('addNewTodo axios', todo)
  return await axios.post(ADD_NEW_TODO, todo)
}
