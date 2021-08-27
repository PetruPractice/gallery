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
    const getAlbumById = albumId => state.page.albums.find(album => album._id === albumId)

    emitter.on('chooseAlbum', (albumId, parentAlbumId) => {
        getJSON('/api/folder/new/' + parentAlbumId + '/' + albumId).then(res => {
            for (const album of state.page.albums) {
                album.children = album.children.filter(child => child._id != albumId)
            }
            const isRoot = parentAlbumId === -1
            
            const albumPage = isRoot ? document.querySelector('.albums_list') : document.getElementById('album_' + parentAlbumId)
            const albumButton = document.querySelector('[data-target="album_'+albumId+'"]')
            albumPage.insertBefore(albumButton, albumPage.firstElementChild.nextSibling)

            // toggle root
            const chooseRoot = document.querySelector('#move_album_' + albumId).querySelectorAll('tr')[1]
            if(!isRoot) {
                getAlbumById(parentAlbumId).children.push(getAlbumById(albumId))
                chooseRoot.style.removeProperty('display')
            } else {
                chooseRoot.style.display = 'none'
            }
        })
    })
}
