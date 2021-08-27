const {getJSON} = require('../utils')

module.exports = (state, emitter) => {
    emitter.on('deleteAlbum', albumId => {
        getJSON('/api/album/remove/' + albumId).then(res => {
            state.page.albums = state.page.albums.filter(album => album._id !== albumId)
            //  emitter.emit('render')
            document.querySelector('[data-target="album_'+albumId+'"]').remove()
            document.getElementById('album_' + albumId).remove()
        })
    })
}

