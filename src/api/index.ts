import axios from 'axios'
import { ITodo } from '../reducers/todosById'

const BASE_URL = 'http://localhost:3000'
const FETCH_ALL_TODOS_URL = BASE_URL + '/todos?status=all'
const ADD_NEW_TODO = BASE_URL + '/todos'

export async function fetchAllTodos() {
  return await axios.get(FETCH_ALL_TODOS_URL).then((response) => response.data)
}

export async function addNewTodo(todo: ITodo) {
  console.log('addNewTodo axios', todo)
  return await axios.post(ADD_NEW_TODO, todo)
}
