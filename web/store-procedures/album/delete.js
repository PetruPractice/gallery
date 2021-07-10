const {getJSON, $} = require('../utils')

module.exports = (state, emitter) => {
    emitter.on('deleteAlbum', albumId => {
        getJSON('/api/album/remove/' + albumId).then(res => {
            $('popups').firstChild.remove()
            state.page.albums = state.page.albums.filter(album => album._id !== albumId)
            state.page.mainAlbums = state.page.mainAlbums.filter(album => album._id !== albumId)
            emitter.emit('render')
        })
    })
}

