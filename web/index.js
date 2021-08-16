window.React = require('jsx-dom')
const choo = require('choo')
const app = choo()
app.mount('body')

//store procedures
app.use(require('./store-procedures/structure'))
app.use(require('./store-procedures/popup'))
app.use(require('./store-procedures/tags'))
app.use(require('./store-procedures/album/create'))
app.use(require('./store-procedures/album/delete'))
app.use(require('./store-procedures/album/enter-exit'))
app.use(require('./store-procedures/album/move'))
app.use(require('./store-procedures/album/populate'))
app.use(require('./store-procedures/image/enter-exit'))
app.use(require('./store-procedures/image/move'))
app.use(require('./store-procedures/image/tags'))
app.use(require('./store-procedures/image/upload'))

//styles
import './style.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'
//routes
//  app.route('/', require('./views/join-room'))
// app.route('/:roomID/:name', require('./views/stream'))
app.route('/', require('./views/album'))
app.route('/tags', require('./views/tags'))
app.route('/upload', require('./views/upload'))