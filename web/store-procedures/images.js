module.exports = (state, emitter) => {
    state.images = []

    fetch('/api/images').then(res => res.json()).then(images => {
        state.images = images
        emitter.emit('render')
    })
}