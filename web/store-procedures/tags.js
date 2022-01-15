export default (state={}, emitter) => {

    emitter.on('tag.add', (tagId, imageId) => {
        fetch(baseURL + '/api/tag/link/' + tagId + '/' + imageId).then(res => res.json()).then(res => {
        })
    })

    emitter.on('tag.delete', (tagId, imageId) => {
        fetch(baseURL + '/api/tag/delete/' + tagId + '/' + imageId).then(res => res.json()).then(res => {
            state.page.albums.forEach(album => album.images.forEach(img => {
                if (Array.isArray(img.tags) && img._id === imageId) {
                    img.tags = img.tags.filter(tag => tag._id !== tagId)
                }
            }))
        })
    })

    emitter.on('applyTagToWholeAlbum', (e, tagId, albumId) => {
        // TODO
    })
}
