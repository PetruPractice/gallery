module.exports = (state, emitter) => {

    emitter.on('imageZoom', imageId => {
        state.page.imagePreview = imageId
        emitter.emit('tags:forImage', imageId)
    })

    emitter.on('imageClose', e => {
        delete state.page.imagePreview
        emitter.emit('render')
        
    })
}
