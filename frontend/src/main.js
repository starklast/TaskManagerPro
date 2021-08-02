import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import stores from '~s'
import App from './App'

ReactDOM.render(
  <Provider stores={stores}>
    <App />
  </Provider>,
  document.getElementById('app')
)
