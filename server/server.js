const fs = require('fs')
const db = require('./db')

const loadSocketServer = async ssl => {
    const server = require('fastify')(ssl)

    await server.register(require('middie'))
    
    ssl && await server.register(require('fastify-https-redirect'), { httpPort: 80 })
    
    await server.register(require('fastify-websocket'), { options: { maxPayload: 16 * 1024 * 1024 } })

    // server.static = root => {
        server.register(require('fastify-static'), {root:process.cwd()})
    //     server.setNotFoundHandler((req, res) => res.type('text/html').sendFile('index.html'))
    // }
    await server.register((server, opts, done) => {
        server.get('/images',  (req, res) => 
            res.send(JSON.stringify(fs.readdirSync(process.cwd() + '/web/images').map(image => '/api/images/' + image)))
        )
        server.get('/images/:image', (req, res) => res.sendFile('/web/images/' + req.params.image))
        server.get('/tag/create/:name/:color/:desc', (req, res) => res.send(db.createTag(req.params)))
        server.get('/tag/list', (req, res) => res.send(db.listTags()))
        done()
    }, {prefix: '/api'})
    // https://parceljs.org/api.html#bundler
    server.parcel = path => server.use(new (require('parcel-bundler'))(path, {publicUrl: '/frontend'}).middleware())

    return server
}

module.exports = loadSocketServer
