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
    emitter.on('addTag', (imageId, tagId) => {
        fetch('/api/tag/link/' + tagId + '/' + imageId).then(res => res.json()).then(res => {
            emitter.emit('tags:forImage', imageId)
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
