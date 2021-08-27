module.exports = (state, emitter) => {
    emitter.on('createTag', e => {
        e.preventDefault()
    
        const form = new FormData(e.target)
        
        
        const name = form.get('tagName')
        const color = form.get('tagColor').replace('#', '')
        const desc = form.get('tagDesc')
        fetch('/api/tag/create/' + [name, color, desc].join('/')).then(res => res.json()).then(res => {
            console.log('tag create res', res)
            emitter.emit('listTags')
        })

    })
    emitter.on('tag.add', (tagId, imageId) => {
        fetch('/api/tag/link/' + tagId + '/' + imageId).then(res => res.json()).then(res => {
        })
    })

    emitter.on('tag.delete', (tagId, imageId) => {
        fetch('/api/tag/delete/' + tagId + '/' + imageId).then(res => res.json()).then(res => {
            state.page.albums.forEach(album => album.images.forEach(img => {
                if (Array.isArray(img.tags) && img._id === imageId) {
                    img.tags = img.tags.filter(tag => tag._id !== tagId)
                }
            }))
        })
    })
    
    fetch('/api/tag/list').then(res => res.json()).then(tags => {
        state.page.tags = tags
        emitter.emit('render')
    })

    emitter.on('applyTagToWholeAlbum', (e, tagId, albumId) => {
        // TODO
    })

}
