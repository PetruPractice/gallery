module.exports = (state, emitter) => {
    emitter.on('moveIn', album => {
        album.isIn = true
        emitter.emit('render')
    })

    emitter.on('moveOut', album => {
        delete album.isIn
        emitter.emit('render')
    })   
}
