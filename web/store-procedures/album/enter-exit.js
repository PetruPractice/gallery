const traverseTree = (albums, parent, child) => {
    for (let i = 0; i < albums.length; i++) {
        if (albums[i]._id === parent._id) {
            albums[i] = child
        }
    }
}

module.exports = (state, emitter) => {
    emitter.on('moveIn', e => {
        const albumId = parseInt(e.target.getAttribute('albumId'))
        const album = state.page.albums.find(album => album._id === albumId)
        traverseTree(state.page.mainAlbums, album.parent, album)
        
        emitter.emit('render')
    })

    emitter.on('moveOut', mainAlbums => {
        const albumId = parceInt(mainAlbums.target.getAttribute('albumId'))
        const album = state.page.mainAlbums.find(album => album._id === albumId)
        traverseTree(state.page.mainAlbums, album, album.parent)
        emitter.emit('render')
    })
    
}

