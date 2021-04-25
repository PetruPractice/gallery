module.exports = (state, emitter) => {
    state.tags = []

    emitter.on('createTag', e => {
        e.preventDefault()
    
        const form = new FormData(e.target)
        
        
        const name = form.get('tagName')
        const color = form.get('tagColor').replace('#', '')
        const desc = form.get('tagDesc')
        fetch('/api/tag/create/' + [name, color, desc].join('/')).then(res => res.json()).then(res => {
            console.log(res)
            emitter.emit('listTags')
        })

    })
    emitter.on('listTags', () => {
        fetch('/api/tag/list').then(res => res.json()).then(tags => {
            state.tags = tags
            emitter.emit('render')
        })
    })
    emitter.emit('listTags')
}
