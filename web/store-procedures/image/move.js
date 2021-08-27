const {getJSON} = require('../utils')

module.exports = (state, emitter) => {

    emitter.on('chooseAlbumForImage', (imageId, albumId) => {
        getJSON('/api/image/move/' + imageId + '/' + albumId).then(res =>
            document.getElementById('album_' + albumId).appendChild(document.querySelector('[data-target="image_'+imageId+'"]'))
        )
    })
    
    emitter.on('deleteImage', imageId => {
        getJSON('/api/image/delete/' + imageId).then(res => {
            document.querySelector('[data-target="image_'+imageId+'"]').remove()
            document.getElementById('image_' + imageId).remove()
        })
    })
}
