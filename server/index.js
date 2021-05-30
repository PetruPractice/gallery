'use strict'
const loadSocketServer = require('./server')
loadSocketServer().then(server => {
    server.parcel(process.cwd() + '/web/index.html')
    server.listen(80, '0.0.0.0').then(addr => console.log(`server listening on ${addr}`))
})
