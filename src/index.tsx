import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './components/App'
import { store } from './configureStore'
import './scss/variables.scss'
import './scss/bootstrapTheming.scss'
import './scss/index.scss'
import './styles/index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
