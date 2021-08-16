const {getJSON} = require('../utils')

const findAndDeleteAlbum = (albums, albumId) => {
    for (let i = 0; i < albums.length; i++) {
        const album = albums[i]
        if(album._id == albumId) {
            albums.splice(i, 1)
            return album
        }
        const found = findAndDeleteAlbum(album.children, albumId)
        if(found) return found 
    }

}

const addChildToParent = (albums, parentAlbumId, childAlbum) => {
    albums.forEach(album => {
        if(parentAlbumId == album._id) {
            album.children.push(childAlbum)
            return
        }
        addChildToParent(album.children, parentAlbumId, childAlbum)
    })
}


module.exports = (state, emitter) => {
    emitter.on('chooseAlbum', (albumId, parentAlbumId) => {
        getJSON('/api/folder/new/' + parentAlbumId + '/' + albumId).then(res => {
            const childAlbum = findAndDeleteAlbum(state.page.mainAlbums, albumId)   
            addChildToParent(state.page.mainAlbums, parentAlbumId, childAlbum)    
            emitter.emit('render')
        
        })
    })
}
