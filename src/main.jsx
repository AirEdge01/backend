import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import counterReducer from './redux/counterSlice.js';
import { configureStore } from '@reduxjs/toolkit'
import reducer from './redux/counterSlice.js'

let store = configureStore({
    reducer:{
    counter: counterReducer
  }
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
        <App/>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
