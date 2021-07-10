const {getJSON, $} = require('../utils')

const addChildParent = (albums, parent, albumId) => {
    const childAlbum = albums.find(album => albumId === album._id)
    childAlbum.parent = parent
    return childAlbum
}

module.exports = (state, emitter) => {
    getJSON('/api/album/all').then(albums => {        
        albums.forEach(album => album.children = album.children.map(albumId => addChildParent(albums, album, albumId)))
        state.page.mainAlbums = albums.filter(album => !album.parent)
        state.page.albums = albums
        emitter.emit('render')
    })
}
