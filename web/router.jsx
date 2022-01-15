import { render } from 'preact'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import Router from 'preact-router'
import React from 'preact/compat'

// stores
import params from './store-procedures/params.jsx'
import page from './store-procedures/structure.jsx'
// import storeProcedure from './store-procedures/popup'
// import storeProcedure from './store-procedures/tags'
// import storeProcedure from './store-procedures/album/create'
// import storeProcedure from './store-procedures/album/delete'
// import storeProcedure from './store-procedures/album/enter-exit'
// import storeProcedure from './store-procedures/album/move'
// import storeProcedure from './store-procedures/album/populate'
// import storeProcedure from './store-procedures/image/move'
// import storeProcedure from './store-procedures/image/upload'

// pages
import Album from './views/album.jsx'
import Tags from './views/tags.jsx'
import Upload from './views/upload.jsx'
import Login from './views/login.jsx'

window.React = React
const store = createStore(combineReducers({ page, params }))
store.dispatch({ type: 'getData', store })

const interceptor = ({ current }) => current?.props && store.dispatch({ type: 'updateParams', params: current.props })

render(
  <Provider store={store}>
    <Router onChange={interceptor}>
      <Login path='/' default />
      <Album path='/albums' />
      <Tags path='/tags' />
      <Upload path='/upload' />
    </Router>
  </Provider>
, document.body)
