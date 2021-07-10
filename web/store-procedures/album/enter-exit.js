const traverseTree = (albums, parent, child) => {
    for (let i = 0; i < albums.length; i++) {
        if (albums[i]._id === parent._id) {
            albums[i] = child
        }
    }
}

module.exports = (state, emitter) => {
    emitter.on('moveIn', album => {
        traverseTree(state.page.mainAlbums, album.parent, album)
        
        emitter.emit('render')
    })

    emitter.on('moveOut', album => {
        traverseTree(state.page.mainAlbums, album, album.parent)
        emitter.emit('render')
    })
    
}

