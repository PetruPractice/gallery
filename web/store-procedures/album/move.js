const {getJSON, $} = require('../utils')

module.exports = (state, emitter) => {
    emitter.on('chooseAlbum', (albumId, parentAlbumId) => {
        // TODO: Do the actual move in DB, refresh album list in main page
        getJSON('/api/folder/new/' + parentAlbumId + '/' + albumId).then(res => {
            $('popups').firstChild.remove()
            //TODO: what do do when new album added to the folder ...Autorefresh
        })
    })
}
