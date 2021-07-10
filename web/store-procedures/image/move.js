const {getJSON, $} = require('../utils')

module.exports = (state, emitter) => {

    emitter.on('chooseAlbumForImage', (imageId, albumID) => {
        getJSON('/api/image/move/' + imageId + '/' + albumID).then(res => {
            $('popups').firstChild.remove()
        })
  
    })
}
