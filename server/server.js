const fs = require('fs')
const db = require('./db')
const loadSocketServer = async () => {
    const server = require('fastify')()
    await server.register(require('middie'))
    server.register(require('fastify-static'), { root: process.cwd() })
    await server.register(async (server, opts, done) => {
        await server.register(require('fastify-file-upload'))
        server.get('/images', (req, res) =>
            res.send(JSON.stringify(JSON.parse(db.getImagesFromAlbum(0)).map(image => '/api/images/' + image.title))) // TODO: Images can exist in other albums too, fix this
        )
        server.get('/images/:image', (req, res) => res.sendFile('/web/images/' + req.params.image))
        server.get('/tag/link/:tagId/:imageId', (req, res) => res.send(db.linkTag(req.params)))
        server.get('/tag/create/:name/:color/:desc', (req, res) => res.send(db.createTag(req.params)))
        server.get('/tags/:imageId', (req, res) => res.send(db.tagsOfImage(req.params.imageId)))
        server.get('/tag/list', (req, res) => res.send(db.listTags()))

        server.post('/upload', (req, res) => {
            const bodyFiles = req.body['files[]']
            const images = Array.isArray(bodyFiles) ? bodyFiles : [bodyFiles]
            images.forEach(({ name, data, md5, size }) => {
                db.addImage({ name, md5, size })
                fs.writeFileSync(process.cwd() + '/web/images/' + name, data)
            })

            res.send(JSON.stringify({ status: 'ok' }))
        })

        server.get('/album/new/:title/:desc', (req, res) => res.send(db.createAlbum(req.params)))
        server.get('/folder/new/:parentAlbumID/:albumID', (req, res) => res.send(db.addFolderAlbum(req.params)))
        server.get('/album/list', (req, res) => res.send(db.getAllAlbums()))
        server.get('/album/folders', (req, res) => res.send(db.getFolders()))
        server.get('/album/images/:albumID', (req, res) => res.send(db.getImagesFromAlbum(req.params.albumID)))
        server.get('/album/list/:albumID', (req, res) => res.send(db.getAlbumsFromFolder(req.params.albumID)))
        server.get('/image/move/:imageId/:albumID', (req, res) => res.send(db.changeImageAlbum(req.params)))
        server.get('/album/remove/:albumID', (req, res) => res.send(db.removeAlbum(req.params.albumID)))
        done()
    }, { prefix: '/api' })
        // https://parceljs.org/api.html#bundler
    server.parcel = path => server.use(new(require('parcel-bundler'))(path, { publicUrl: '/frontend' }).middleware())
    return server
}


module.exports = loadSocketServer
