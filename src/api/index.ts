import axios from 'axios'
import { ITodo } from '../reducers/todosById'

const BASE_URL = 'http://localhost:3000'
const FETCH_ALL_TODOS_URL = BASE_URL + '/todos?status=all'
const ADD_NEW_TODO = BASE_URL + '/todos'
const EDIT_TODO = BASE_URL + '/todos'
const DELETE_TODO = BASE_URL + '/todos/'
const TOGGLE_TODO = BASE_URL + '/todos'
const TOGGLE_TODOS = BASE_URL + '/todos/toggle_all'
const REGISTER_NEW_USER = BASE_URL + '/register'
const LOGIN_USER = BASE_URL + '/login'
const REFRESH_TOKENS = BASE_URL + '/refresh_token'
const DELETE_COMPLETED_TODOS = BASE_URL + '/todos_completed'

export type Tokens = {
  accessToken: string
  refreshToken: string
}

function getAccessToken() {
  const localStorageData = localStorage.getItem('tokensStatusData')
  if (localStorageData) {
    return JSON.parse(localStorage.getItem('tokensStatusData')!).accessToken
  } else {
    return ''
  }
}

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log('interceptor', localStorage.getItem('tokensStatusData'))
    config.headers = { Authorization: getAccessToken() }
    return config
  },
  function (error) {
    // Do something with request error
    console.log('axios interceptors error', error)
  }
)

axios.defaults.headers.common['Authorization'] = getAccessToken()

export async function fetchAllTodos(): Promise<ITodo[]> {
  return await axios.get(FETCH_ALL_TODOS_URL).then((response) => response.data)
}

export async function addNewTodo(todo: ITodo) {
  await axios.post(ADD_NEW_TODO, todo)
}

export async function deleteTodo(todoId: string) {
  await axios.delete(DELETE_TODO + todoId)
}

export async function registerNewUser(
  userEmail: string,
  userPassword: string
): Promise<Tokens> {
  return await axios
    .post(REGISTER_NEW_USER, { userEmail, userPassword })
    .then((response) => response.data)
}

export async function loginUser(
  userEmail: string,
  userPassword: string
): Promise<Tokens> {
  return await axios
    .post(LOGIN_USER, { userEmail, userPassword })
    .then((response) => response.data)
}

export async function performRefreshToken(
  refreshToken: string
): Promise<Tokens> {
  return await axios
    .post(REFRESH_TOKENS, { refreshToken })
    .then((response) => response.data)
}

export async function performToggleTodo(todoId: string) {
  await axios.patch(TOGGLE_TODO + `/${todoId}`)
}

export async function performToggleTodos(newTodosStatus: boolean) {
  await axios.patch(TOGGLE_TODOS, { status: newTodosStatus })
}

export async function deleteCompletedTodos() {
  await axios.delete(DELETE_COMPLETED_TODOS)
}

export async function editTodo(todoId: string, todoText: string) {
  await axios.put(EDIT_TODO + `/${todoId}`, { todoText })
}
