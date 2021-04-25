const choo = require('choo')
const app = choo()
app.mount('body')

//store procedures
app.use(require('./store-procedures/join-room'))
app.use(require('./store-procedures/images'))
app.use(require('./store-procedures/tags'))

//styles
import './style.scss'

//routes
//  app.route('/', require('./views/join-room'))
// app.route('/:roomID/:name', require('./views/stream'))
app.route('/', require('./views/album'))
app.route('/tags', require('./views/tags'))

